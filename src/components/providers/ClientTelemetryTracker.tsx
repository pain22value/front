"use client";

import { useEffect, useRef } from "react";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";
// import api from "@/shared/api/axios";

// 마우스 움직임 샘플링 간격 (100ms) - 초당 10번만 궤적 기록
const MOUSE_TRACKING_SAMPLE_RATE_MS = 100;

// 봇 탐지 및 클라이언트 무결성을 확인할 수 있는 자체 텔레메트리 컴포넌트입니다.
export function ClientTelemetryTracker() {
  const { pageStage, isTracking } = useTelemetryStore();

  // 리액트 상태 변경으로 인한 과도한 리렌더링을 방지하기 위해 Refs 기반으로 누적 지표 카운터를 구성합니다.
  const metrics = useRef({ mousemoveCount: 0, mousemove: [] as MouseMoveData[] });
  const stageEntryTime = useRef<number>(0);
  const lastMouseMoveTime = useRef<number>(0);

  useEffect(() => {
    if (!isTracking) return;

    // 새로운 단계 진입 또는 트래킹 시작 시 진입 시점 기록
    stageEntryTime.current = Date.now();

    // 마우스 무브 감지 이벤트
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // 원본 DOM 이벤트 횟수는 빠짐없이 측정
      metrics.current.mousemoveCount += 1;

      // 트래픽 및 서버 부하를 고려한 궤적 좌표 샘플링 여부 (100ms)
      const isReadyToSample = now - lastMouseMoveTime.current > MOUSE_TRACKING_SAMPLE_RATE_MS;
      if (isReadyToSample) {
        metrics.current.mousemove.push({ timestamp: now, x: e.clientX, y: e.clientY });
        lastMouseMoveTime.current = now;
      }
    };

    // 트래킹 종료 시 모아둔 데이터를 한 번에 전송하는 함수
    const sendTelemetry = async () => {
      // 서버로 보낼 전체 데이터 페이로드
      const payload: ClientTelemetryData = {
        page_stage: pageStage,
        mousemove: metrics.current.mousemove,
        mousemove_count: metrics.current.mousemoveCount,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        page_enter_ts: stageEntryTime.current,
        page_leave_ts: Date.now(),
      };

      // 🚨 콘솔 테스트 로깅 - 분석 종료 시 한 번 모아서 출력
      console.log(
        `[Telemetry 송출 - ${pageStage} 단계] 체류 시작: ${new Date(stageEntryTime.current).toLocaleTimeString()}, 종료: ${new Date().toLocaleTimeString()} (총 ${metrics.current.mousemoveCount}회 움직임)`,
        payload,
      );

      try {
        // 🚨 서버의 분석 이벤트 엔드포인트가 구현된 후 아래 주석을 해제해주세요.
        // await api.post("/telemetry/events", payload);
      } catch (error) {
        console.error("텔레메트리 데이터를 보내는 데 실패했습니다.", error);
      }

      // 전송을 완료했다면, 지표들의 카운터만 다시 0으로 청소해줍니다. (이후 계속 취합)
      metrics.current = { mousemoveCount: 0, mousemove: [] };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      sendTelemetry();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [pageStage, isTracking]);

  return null;
}
