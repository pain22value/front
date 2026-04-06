import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTelemetryStore = create<TelemetryState>()(
  persist(
    (set) => ({
      pageStage: "other", // 초기 접속시나 예매 외 화면은 other
      isTracking: false, // 예매 버튼을 눌렀을 때만 true로 변환하여 수집 오버헤드 최소화
      setPageStage: (pageStage) => set({ pageStage }),
      startTracking: () => set({ isTracking: true }),
      stopTracking: () => set({ isTracking: false }),
    }),
    {
      name: "telemetry-storage",
    }
  )
);
