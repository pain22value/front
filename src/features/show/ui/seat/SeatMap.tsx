"use client";

import { useTicketingStore } from "@/features/ticketing/stores/useTicketingStore";
import { getApiErrorMessage, isApiErrorCode } from "@/shared/api/error";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useGetSeats } from "../../hooks/useGetSeats";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import { seatService } from "../../services/seatService";
import { SeatCanvas } from "./SeatCanvas";
import { SeatGradeLegend } from "./SeatGradeLegend";
import { SeatPanel } from "./SeatPanel";
import { usePageTelemetry } from "@/shared/hooks/usePageTelemetry";
import { useModalStore } from "@/shared/stores/modalStore";
import { useTelemetryStore } from "@/shared/stores/useTelemetryStore";

interface SeatMapProps {
  showScheduleId: number;
}

export const SeatMap = ({ showScheduleId }: SeatMapProps) => {
  const router = useRouter();
  const { openAlert } = useModalStore();
  const { clearTicketing } = useTicketingStore();
  const { data: sections, isLoading, isError } = useGetSeats(showScheduleId);
  const { selectedSeats, expiredAt, selectSeat, cancelSeat, cancelAll, holdAll } = useSeatSelection(showScheduleId);
  const { stopTracking } = useTelemetryStore();

  usePageTelemetry("seatmap");

  const handleSeatClick = useCallback((seat: Seat) => {
    selectSeat(seat);
  }, [selectSeat]);

  const handlePayment = useCallback(async () => {
    if (selectedSeats.length === 0) return;
    try {
      const success = await holdAll();
      if (!success) return;

      try {
        await seatService.releaseSeats(
          showScheduleId,
          selectedSeats.map((seat) => Number(seat.seatId)),
        );
      } catch {
        // 시연용 강제 차단 플로우이므로 release 실패는 무시한다.
      }

      stopTracking();
      openAlert({
        title: "매크로 의심 유저입니다.",
        description: "비정상적인 접근이 감지되어 예매가 제한되었습니다. 다시 시도해 주세요.",
        confirmText: "확인",
        onConfirm: () => {
          sessionStorage.removeItem("selectedSeats");
          clearTicketing();
          router.push("/");
        },
      });
    } catch (error) {
      if (isApiErrorCode(error, "T12")) {
        stopTracking();
        openAlert({
          title: "비정상적인 접근이 감지되었습니다.",
          description: getApiErrorMessage(error) ?? "다시 시도해 주세요.",
          confirmText: "확인",
          onConfirm: () => {
            sessionStorage.removeItem("selectedSeats");
            clearTicketing();
            router.push("/");
          },
        });
        return;
      }

      openAlert({
        title: "좌석 선점에 실패했습니다.",
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  }, [selectedSeats, holdAll, router, stopTracking, openAlert, clearTicketing]);

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
