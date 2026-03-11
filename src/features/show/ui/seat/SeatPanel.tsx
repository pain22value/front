interface SeatPanelProps {
  selectedSeat: Seat | null;
  expiredAt: string | null;
  onCancel: () => void;
  onPayment: () => void;
}

export const SeatPanel = ({
  selectedSeat,
  expiredAt,
  onCancel,
  onPayment,
}: SeatPanelProps) => {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-white border-l w-64">
      <div>
        <span className="text-sm font-semibold">선택 좌석</span>

        {selectedSeat ? (
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">구역</span>
              <span>{selectedSeat.section}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">좌석</span>
              <span>{selectedSeat.row}행 {selectedSeat.col}열</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">등급</span>
              <span>{selectedSeat.grade}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>가격</span>
              <span>{selectedSeat.price.toLocaleString()}원</span>
            </div>

            {/* 7분 타이머 */}
            {expiredAt && (
              <div className="mt-2 text-xs text-red-500 text-center">
                {new Date(expiredAt).toLocaleTimeString()} 까지 선점 유지
              </div>
            )}

            <button
              onClick={onCancel}
              className="mt-2 text-xs text-gray-400 underline text-center"
            >
              선택 취소
            </button>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-400">좌석을 선택해주세요</p>
        )}
      </div>

      <button
        onClick={onPayment}
        disabled={!selectedSeat}
        className="w-full py-3 bg-black text-white rounded-lg text-sm disabled:opacity-30"
      >
        결제하기
      </button>
    </div>
  );
};