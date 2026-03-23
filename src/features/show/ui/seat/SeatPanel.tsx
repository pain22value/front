interface SeatPanelProps {
  selectedSeats: Seat[];          // ← 배열로 변경
  expiredAt: string | null;
  onCancel: (seatId: string) => void;
  onCancelAll: () => void;        // ← 전체 취소 추가
  onPayment: () => void;
}

export const SeatPanel = ({
  selectedSeats,
  expiredAt,
  onCancel,
  onCancelAll,
  onPayment,
}: SeatPanelProps) => {
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-white border-l w-64">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">선택 좌석</span>
          <span className="text-xs text-gray-400">{selectedSeats.length} / 4</span>
        </div>

        {selectedSeats.length > 0 ? (
          <div className="mt-4 flex flex-col gap-3">
            {selectedSeats.map((seat) => (
              <div key={seat.seatId} className="border rounded-lg p-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">구역</span>
                  <span>{seat.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">좌석</span>
                  <span>{seat.row}행 {seat.col}열</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">등급</span>
                  <span>{seat.grade}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>가격</span>
                  <span>{seat.price.toLocaleString()}원</span>
                </div>
                <button
                  onClick={() => onCancel(seat.seatId)}
                  className="mt-1 w-full text-xs text-gray-400 underline text-center"
                >
                  선택 취소
                </button>
              </div>
            ))}

            {/* 합계 */}
            <div className="flex justify-between text-sm font-bold border-t pt-2">
              <span>합계</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>

            {/* 7분 타이머 */}
            {expiredAt && (
              <div className="text-xs text-red-500 text-center">
                {new Date(expiredAt).toLocaleTimeString()} 까지 선점 유지
              </div>
            )}

            {/* 전체 취소 */}
            <button
              onClick={onCancelAll}
              className="text-xs text-gray-400 underline text-center"
            >
              전체 취소
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-400">
            좌석을 선택해주세요 (최대 4개)
          </p>
        )}
      </div>

      <button
        onClick={onPayment}
        disabled={selectedSeats.length === 0}
        className="w-full py-3 bg-black text-white rounded-lg text-sm disabled:opacity-30"
      >
        {selectedSeats.length > 0
          ? `${totalPrice.toLocaleString()}원 결제하기`
          : "결제하기"}
      </button>
    </div>
  );
};