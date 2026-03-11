/* API 나오면 이 코드 사용
import { useState } from "react";
import { seatService } from "../services/seatService";

export const useSeatSelection = (showId: number) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [expiredAt, setExpiredAt] = useState<string | null>(null);

  // 좌석 선택 시 → 임시 점유 요청
  const selectSeat = async (seat: Seat) => {
    if (seat.status !== "available") return; // 예매 불가 좌석은 무시

    const response = await seatService.reserveSeat(showId, seat.seatId);
    setSelectedSeat(seat);
    setExpiredAt(response?.expiredAt ?? null); // 7분 타이머용
  };

  // 좌석 선택 해제 시 → 임시 점유 취소 요청
  const cancelSeat = async () => {
    if (!selectedSeat) return;

    await seatService.cancelReserveSeat(showId, selectedSeat.seatId);
    setSelectedSeat(null);
    setExpiredAt(null);
  };

  return { selectedSeat, expiredAt, selectSeat, cancelSeat };
};
*/

import { useState } from "react";
import { seatService } from "../services/seatService";

export const useSeatSelection = (showId: number) => {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [expiredAt, setExpiredAt] = useState<string | null>(null);

  const selectSeat = async (seat: Seat) => {
    if (seat.status !== "available") return;

    try {
      const response = await seatService.reserveSeat(showId, seat.seatId);
      setSelectedSeat(seat);
      setExpiredAt(response?.expiredAt ?? null);
    } catch {
      // API 없을 때는 그냥 선택 상태만 변경
      setSelectedSeat(seat);
    }
  };

  const cancelSeat = async () => {
    if (!selectedSeat) return;

    try {
      await seatService.cancelReserveSeat(showId, selectedSeat.seatId);
    } catch {
      // API 없을 때는 무시
    } finally {
      setSelectedSeat(null);
      setExpiredAt(null);
    }
  };

  return { selectedSeat, expiredAt, selectSeat, cancelSeat };
};