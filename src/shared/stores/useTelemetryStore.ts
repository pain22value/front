import { create } from "zustand";
import { persist } from "zustand/middleware";

// 텔레메트리 상태 구조
interface TelemetryState {
  sessionId: string; // 예매 흐름 시에만 유지될 세션 고유 식별자 (매크로/봇 탐지 시 1회 접속 단위 추적)
  deviceId: string; // 기기별 식별을 위한 고유성 (로컬 스토리지 등에 지속됨)
  pageStage: PageStage; // 어떤 예매 프로세스 화면을 진행중인지
  isTracking: boolean; // 트래킹이 시작되어 10초마다 서버로 데이터를 발송하고 있는지
  setPageStage: (stage: PageStage) => void;
  startTracking: () => void;
  stopTracking: () => void;
  initSession: () => void;
}

// 텔레메트리 매크로 봇 데이터용 상태 관리 훅 (Zustand)
export const useTelemetryStore = create<TelemetryState>()(
  persist(
    (set) => ({
      // Next.js 환경에서도 안심하고 사용할 수 있도록 window.crypto 체크 후 안전하게 할당
      sessionId: typeof crypto !== "undefined" ? crypto.randomUUID() : "",
      deviceId: typeof crypto !== "undefined" ? crypto.randomUUID() : "",
      pageStage: "other", // 초기 접속시나 예매 외 화면은 other
      isTracking: false, // 예매 버튼을 눌렀을 때만 true로 변환하여 수집 오버헤드 최소화

      // 현재 진행 화면 단계 업데이트 핸들러
      setPageStage: (pageStage) => set({ pageStage }),

      // 예매 진입 시 호출하여 랜덤한 세션ID 발급 및 10초 주기 수집 추적 개시
      startTracking: () =>
        set({
          isTracking: true,
          sessionId: typeof crypto !== "undefined" ? crypto.randomUUID() : "",
        }),

      // 예매 종료나 완료 등에 수집을 중단
      stopTracking: () => set({ isTracking: false }),

      // 세션을 다시 초기화해야할 경우 사용
      initSession: () =>
        set({
          sessionId: typeof crypto !== "undefined" ? crypto.randomUUID() : "",
        }),
    }),
    {
      name: "telemetry-storage",
      // 사용자의 deviceId 식별값만 브라우저 스토리지에 유지시켜 매크로/동일기기 판별에 사용
      partialize: (state) => ({ deviceId: state.deviceId }),
    },
  ),
);
