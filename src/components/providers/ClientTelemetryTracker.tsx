"use client";

import { useEffect, useRef } from "react";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";
// import api from "@/shared/api/axios";

// 데이터 전송 주기 (10초) - 백엔드 부하를 줄이면서도 봇 탐지에 유리한 간격으로 구성
const SEND_INTERVAL_MS = 10000;

// 인간의 동작 범위를 초과하는 매우 빠른 순간 이동의 판단을 위한 기준 픽셀 (50ms 내에 500픽셀 이상 이동 시)
const DISTANCE_TELEPORT_THRESHOLD = 500;

// 봇 탐지 및 클라이언트 무결성을 확인할 수 있는 자체 텔레메트리 컴포넌트입니다.
export function ClientTelemetryTracker() {
  const { sessionId, deviceId, pageStage, isTracking } = useTelemetryStore();

  // 리액트 상태 변경으로 인한 과도한 리렌더링을 방지하기 위해 Refs 기반으로 누적 지표 카운터를 구성합니다.
  const metrics = useRef({
    mousemoveCount: 0,
    mousemoveTeleportCount: 0,
    hoverDwellMs: 0, // 마우스가 전혀 움직이지 않고 멈춰있던 누적 시간 기록
    clickCount: 0,
    keyboardEventCount: 0, // 매크로의 키 연속 입력을 감지할 수 있는 지표
    windowBlurCount: 0, // 윈도우 포커스가 외부로 이탈하는 경우 체크
  });

  // 이전 마우스 위치나 시간을 계산하여 매크로 특성(순간이동 등) 감지를 위한 보조 Refs
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 }); // 이전 커서
  const mouseStationarySince = useRef(0); // 현재 마우스가 멈춘 시각 (Dwell 계산용)
  const lastSentTime = useRef(0); // 직전에 데이터를 서버에 송출한 시각 기준
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 예매 진입 (트래킹 ON) 상태가 아니라면 모든 타이머를 내리고 종료합니다.
    if (!isTracking) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // 마우스의 이동 궤적을 확인하여 텔레포트 등을 감지하는 함수
    const trackMousePosition = (x: number, y: number, now: number) => {
      // 1. 순수 마우스 이동 발생 자체 횟수를 측정
      metrics.current.mousemoveCount += 1;

      // 2. 과거의 커서 좌표가 존재할 때 X, Y 간 거리(dx, dy)를 피타고라스로 취합
      if (lastMousePos.current.time > 0) {
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        const dt = now - lastMousePos.current.time;

        // 아주 짧은 시간(예: 50ms 미만)에 멀리 이동했다면 매크로 봇 작동 중이거나 셀레니움 등의 화면 외 개입으로 간주
        if (dt < 50) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > DISTANCE_TELEPORT_THRESHOLD) {
            metrics.current.mousemoveTeleportCount += 1;
          }
        }
      }

      // 3. 이전 마우스가 정지해있던 시간 계산 (Dwell Time)
      if (mouseStationarySince.current > 0) {
        const stationaryTime = now - mouseStationarySince.current;
        // 500ms 이상 정지했을 때만 화면을 바라보거나 읽은(Hover Dwell) 시간으로 유의미하게 판단
        if (stationaryTime > 500) {
          metrics.current.hoverDwellMs += stationaryTime;
        }
      }

      // 이번 움직임의 좌표 및 시간을 갱신시킵니다.
      lastMousePos.current = { x, y, time: now };

      // 움직였으므로 이 순간부터 다시 마우스 정지 시간을 새롭게 시작합니다.
      mouseStationarySince.current = now;
    };

    // 마우스 무브 감지 이벤트
    const handleMouseMove = (e: MouseEvent) => {
      trackMousePosition(e.clientX, e.clientY, Date.now());
    };

    // 마우스 클릭(오토클릭) 의심 등 클릭수 산정
    const handleClick = () => {
      metrics.current.clickCount += 1;
      mouseStationarySince.current = Date.now(); // 클릭도 동작으로 간주하여 Dwell 상태 리셋
    };

    // 키 입력 지표 증가
    const handleKeyDown = () => {
      metrics.current.keyboardEventCount += 1;
    };

    // 창 밖으로 포커스를 벗어난 경우의 카운팅 (매크로 프로그램 혹은 다중 브라우징 여부 참고)
    const handleBlur = () => {
      metrics.current.windowBlurCount += 1;
    };

    // 주기적으로 쌓인 데이터들을 팩으로 묶어서 전송하는 인터벌 콜백
    const sendTelemetry = async () => {
      const now = Date.now();
      const durationMs = now - lastSentTime.current; // 이 팩의 측정 지속 시간 (약 10초)

      // 보내는 순간까지 마우스 움직임이 멈춰있었다면, 정산해주지 못한 남은 휴리스틱 시간을 올려줍니다.
      if (mouseStationarySince.current > 0) {
        const remainingDwell = now - mouseStationarySince.current;
        if (remainingDwell > 500) {
          metrics.current.hoverDwellMs += remainingDwell;
        }
        mouseStationarySince.current = now; // 정산 했으므로 다시 타이머 시작
      }

      // 서버로 보낼 10초 데이터 페이로드
      const payload: ClientTelemetryData = {
        session_id: sessionId,
        page_stage: pageStage,
        ts_ms_client: now,
        duration_ms: durationMs,
        device_id_client: deviceId,
        // user_id_client: 추후 엑세스 토큰 존재 시 서버에 의해 주입되거나 프론트에서 포함 가능
        mousemove_count: metrics.current.mousemoveCount,
        mousemove_teleport_count: metrics.current.mousemoveTeleportCount,
        hover_dwell_ms: metrics.current.hoverDwellMs,
        click_count: metrics.current.clickCount,
        keyboard_event_count: metrics.current.keyboardEventCount,
        page_stay_ms: durationMs,
        window_blur_count: metrics.current.windowBlurCount,
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      };

      // 🚨 콘솔 테스트 로깅 - 브라우저 콘솔(F12)에서 10초마다 뜨는 로그 확인을 위함
      console.log(`[Telemetry 송출 - ${pageStage} 단계] 데이터 수집 기간: 약 10초`, payload);

      try {
        // 🚨 서버의 분석 이벤트 엔드포인트가 구현된 후 아래 주석을 해제해주세요.
        // await api.post("/telemetry/events", payload);
      } catch (error) {
        console.error("텔레메트리 데이터를 보내는 데 실패했습니다.", error);
      }

      // 전송을 완료했다면, 지표들의 카운터만 다시 0으로 청소해줍니다. (이후 계속 취합)
      metrics.current = {
        mousemoveCount: 0,
        mousemoveTeleportCount: 0,
        hoverDwellMs: 0,
        clickCount: 0,
        keyboardEventCount: 0,
        windowBlurCount: 0,
      };

      lastSentTime.current = Date.now();
    };

    // 10초 텔레메트리 배치 전송 루프 시작
    timerRef.current = setInterval(sendTelemetry, SEND_INTERVAL_MS);

    // 이펙트 시작 시점 초기화
    lastSentTime.current = Date.now();
    mouseStationarySince.current = Date.now();

    // DOM 이벤트 리스너 부착
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);

    // 컴포넌트 언마운트 시 클린업 과정 (정리)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
    };
  }, [sessionId, deviceId, pageStage, isTracking]);

  return null;
}
