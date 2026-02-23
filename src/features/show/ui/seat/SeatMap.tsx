// seat 컴포넌트 모두 여기서 조립
"use client";

import { useRouter } from "next/navigation";
import { useGetSeats } from "../../hooks/useGetSeats";
import { useSeatSelection } from "../../hooks/useSeatSelection";
import { SeatCanvas } from "./SeatCanvas";
import { SeatGradeLegend } from "./SeatGradeLegend";
import { SeatPanel } from "./SeatPanel";

interface SeatMapProps {
  showId: number;
}

export const SeatMap = ({ showId }: SeatMapProps) => {
  const router = useRouter();

  // 좌석 목록 가져오기
  const { data: sections, isLoading, isError } = useGetSeats(showId);

  // 좌석 선택/해제 상태 관리
  const { selectedSeat, expiredAt, selectSeat, cancelSeat } = useSeatSelection(showId);

  if (isLoading) return <div className="flex items-center justify-center h-full">로딩 중...</div>;
  if (isError || !sections) return <div className="flex items-center justify-center h-full">좌석 정보를 불러올 수 없습니다.</div>;

  const handlePayment = () => {
    if (!selectedSeat) return;
    router.push(`/payments?seatId=${selectedSeat.seatId}`);
  };

  return (
    <div className="flex h-full">
      {/* 좌석 배치도 영역 */}
      <div className="flex flex-col flex-1 relative">
        <SeatCanvas
          sections={sections}
          selectedSeat={selectedSeat}
          onSeatClick={selectSeat}
        />

        {/* 좌하단 등급별 가격 */}
        <div className="absolute bottom-4 left-4">
          <SeatGradeLegend sections={sections} />
        </div>
      </div>

      {/* 우측 선택 좌석 패널 */}
      <SeatPanel
        selectedSeat={selectedSeat}
        expiredAt={expiredAt}
        onCancel={cancelSeat}
        onPayment={handlePayment}
      />
    </div>
  );
};