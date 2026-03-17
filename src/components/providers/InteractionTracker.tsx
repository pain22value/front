"use client";

import { useEffect, useRef } from "react";
// import { usePostHog } from "posthog-js/react"; // 🚨 PostHog 일시중단
import { useInteractionStore } from "@/shared/store/useInteractionStore";

/**
 * [자체 서버 전송 가이드]
 * 아래의 '자체 서버 전송 로직' 주석들을 해제하면 PostHog와 동시에 본인의 백엔드로 데이터를 보낼 수 있습니다.
 * 고빈도 데이터 전송으로 인한 서버 부하를 방지하기 위해 5초 주기/50개 단위 배치 전송으로 설계되었습니다.
 */

/* const EVENT_QUEUE: any[] = [];
const FLUSH_INTERVAL = 5000; // 5초
const BATCH_SIZE = 50; 
const SERVER_URL = process.env.NEXT_PUBLIC_API_URL + "/analytics/interactions";

// 자체 서버로 데이터를 전송하는 함수
const flushToMyServer = async () => {
  if (EVENT_QUEUE.length === 0) return;
  
  const batch = [...EVENT_QUEUE];
  EVENT_QUEUE.length = 0;

  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch, timestamp: Date.now() }),
      keepalive: true, // 페이지 종료 시에도 전송 보장
    });
  } catch (e) {
    console.error("자체 서버로 분석 데이터를 전송하는 데 실패했습니다.", e);
  }
}; */

export function InteractionTracker() {
  // const posthog = usePostHog(); // 🚨 PostHog 일시중단
  const isTicketingFlow = useInteractionStore((state) => state.isTicketingFlow);

  // 리렌더링 없이 상태를 추적하기 위한 Refs
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const lastClickTime = useRef(0);
  const lastScrollPos = useRef({ y: 0, time: 0 });
  const lastKeyTime = useRef(0);
  const clickPath = useRef<{ x: number; y: number; t: number }[]>([]);

  useEffect(() => {
    // 🚨 PostHog 일시중단 - posthog 의존성 제거
    // if (!posthog) return;

    // 공통 트래킹 함수
    const track = (eventName: string, properties: Record<string, unknown>) => {
      // 핵심: 예매 흐름(10초 동안)이 아니면 데이터를 전송하지 않음
      if (!isTicketingFlow) return;

      const enhancedProperties = {
        ...properties,
        is_ticketing_flow: isTicketingFlow, // 요청한 특정 구간 트래킹 여부 태깅
      };

      // 1. PostHog로 전송 (🚨 일시중단)
      // posthog.capture(eventName, enhancedProperties);

      // 2. 자체 서버 큐에 추가 (주석 해제 시 동작)
      /* EVENT_QUEUE.push({ event: eventName, properties: enhancedProperties, timestamp: Date.now() });
      if (EVENT_QUEUE.length >= BATCH_SIZE) flushToMyServer(); */
    };

    // 자체 서버 전송을 위한 타이머 설정 (주석 해제 시 동작)
    /* const timer = setInterval(flushToMyServer, FLUSH_INTERVAL); */

    // 1. 마우스 속도 및 움직임 분석 (200ms 단위로 제한)
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastMousePos.current.time;

      if (dt >= 200) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const velocity = distance / dt; // ms당 픽셀 이동 거리

        track("mouse_move", {
          mouse_x: e.clientX,
          mouse_y: e.clientY,
          mouse_velocity: velocity,
        });

        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    // 2. 클릭 분석 (간격, 위치, 경로)
    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const interval = now - lastClickTime.current;

      const clickData = { x: e.clientX, y: e.clientY, t: now };
      clickPath.current.push(clickData);
      if (clickPath.current.length > 10) clickPath.current.shift(); // 최근 10개 지점만 유지

      track("mouse_click", {
        click_x: e.clientX,
        click_y: e.clientY,
        click_interval: interval,
        click_path: clickPath.current,
        target_tag: (e.target as HTMLElement).tagName,
        target_id: (e.target as HTMLElement).id,
      });

      lastClickTime.current = now;
    };

    // 3. 스크롤 속도 분석
    const handleScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollPos.current.time;

      if (dt >= 200) {
        const dy = Math.abs(currentY - lastScrollPos.current.y);
        const speed = dy / dt;

        if (speed > 0.1) {
          track("mouse_scroll", {
            scroll_speed: speed,
            scroll_y: currentY,
          });
        }

        lastScrollPos.current = { y: currentY, time: now };
      }
    };

    // 4. 창 포커스 변경 추적
    const handleFocus = () => track("window_focus_change", { state: "focus" });
    const handleBlur = () => track("window_focus_change", { state: "blur" });

    // 5. 키 입력 패턴 분석 (입력 속도 및 리듬)
    const handleKeyDown = () => {
      const now = Date.now();
      const interval = now - lastKeyTime.current;

      // 개인정보 보호를 위해 무엇을 입력했는지가 아니라 '언제' 입력했는지만 수집
      if (interval < 2000) {
        // 타이핑이 어느 정도 연속적인 경우에만 수집
        track("key_pattern", {
          key_interval: interval,
        });
      }

      lastKeyTime.current = now;
    };

    // 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // 정리(Cleanup) 로직
      /* clearInterval(timer); */
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTicketingFlow]); // 🚨 posthog 의존성 제거 (일시중단)

  return null;
}
