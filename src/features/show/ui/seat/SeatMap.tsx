"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useGetSeats } from "../../hooks/useGetSeats";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import { SeatCanvas } from "./SeatCanvas";
import { SeatGradeLegend } from "./SeatGradeLegend";
import { SeatPanel } from "./SeatPanel";
import { usePageTelemetry } from "@/shared/hooks/usePageTelemetry";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";

interface SeatMapProps {
  showScheduleId: number;
}

export const SeatMap = ({ showScheduleId }: SeatMapProps) => {
  const router = useRouter();
  const { data: sections, isLoading, isError } = useGetSeats(showScheduleId);
  const { selectedSeats, expiredAt, selectSeat, cancelSeat, cancelAll, holdAll } = useSeatSelection(showScheduleId);
  const { stopTracking } = useTelemetryStore();

  usePageTelemetry("seatmap");

  const handleSeatClick = useCallback((seat: Seat) => {
    selectSeat(seat);
  }, [selectSeat]);

  const handlePayment = useCallback(async () => {
    if (selectedSeats.length === 0) return;
    const success = await holdAll();
    if (!success) return;
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    router.push(`/payments`);
  }, [selectedSeats, holdAll, router]);

  if (isLoading) return <div className="flex items-center justify-center h-full">로딩 중...</div>;
  if (!sections || sections.length === 0)
    return <div className="flex items-center justify-center h-full">좌석 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 items-center overflow-hidden relative">
        <SeatCanvas
          sections={sections}
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
        />
        <div className="absolute bottom-4 left-4">
          <SeatGradeLegend sections={sections} />
        </div>
      </div>
      <SeatPanel
        selectedSeats={selectedSeats}
        expiredAt={expiredAt}
        onCancel={cancelSeat}
        onCancelAll={cancelAll}
        onPayment={handlePayment}
      />
    </div>
  );
};