import { useState } from "react";
import { seatService } from "../services/seatService";

const MAX_SEATS = 4;

export const useSeatSelection = (showScheduleId: number) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [expiredAt, setExpiredAt] = useState<string | null>(null);

  const selectSeat = async (seat: Seat) => {
    if (seat.status !== "available") return;
    if (selectedSeats.some((s) => s.seatId === seat.seatId)) return; // 이미 선택됨
    if (selectedSeats.length >= MAX_SEATS) return; // 최대 4개

    const next = [...selectedSeats, seat];

    try {
      await seatService.holdSeats(
        showScheduleId,
        next.map((s) => Number(s.seatId))
      );
    } catch {
      // mock 환경에서는 무시
    } finally {
      setSelectedSeats(next);
    }
  };

  const cancelSeat = async (seatId: string) => {
    const next = selectedSeats.filter((s) => s.seatId !== seatId);

    try {
      await seatService.releaseSeats(showScheduleId, [Number(seatId)]);
    } catch {
      // mock 환경에서는 무시
    } finally {
      setSelectedSeats(next);
      if (next.length === 0) setExpiredAt(null);
    }
  };

  const cancelAll = async () => {
    try {
      await seatService.releaseSeats(
        showScheduleId,
        selectedSeats.map((s) => Number(s.seatId))
      );
    } catch {
      // mock 환경에서는 무시
    } finally {
      setSelectedSeats([]);
      setExpiredAt(null);
    }
  };

  return { selectedSeats, expiredAt, selectSeat, cancelSeat, cancelAll };
};