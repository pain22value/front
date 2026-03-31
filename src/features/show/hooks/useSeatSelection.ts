import { useState, useEffect, useRef } from "react";
import { seatService } from "../services/seatService";

const MAX_SEATS = 4;
const HEARTBEAT_INTERVAL = 3 * 60 * 1000; // 3분마다 heartbeat (7분 만료 전에 연장)

export const useSeatSelection = (showScheduleId: number) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [expiredAt, setExpiredAt] = useState<string | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 좌석이 선택되어 있을 때만 heartbeat 실행
  useEffect(() => {
    if (selectedSeats.length > 0) {
      heartbeatRef.current = setInterval(async () => {
        try {
          await seatService.heartbeat(showScheduleId);
        } catch {
          // heartbeat 실패 무시
        }
      }, HEARTBEAT_INTERVAL);
    } else {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    }

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    };
  }, [selectedSeats.length, showScheduleId]);

  const selectSeat = async (seat: Seat) => {
    if (seat.status !== "available") return;
    if (selectedSeats.some((s) => s.seatId === seat.seatId)) return;
    if (selectedSeats.length >= MAX_SEATS) return;

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