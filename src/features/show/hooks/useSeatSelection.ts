import { useState, useEffect, useRef } from "react";
import { seatService } from "../services/seatService";

const MAX_SEATS = 4;
const HEARTBEAT_INTERVAL = 3 * 60 * 1000; // 3분마다 heartbeat

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

  // 좌석 선택할 때마다 api 호출하던 거 삭제하고, state만 업데이트 하도록 변경
  const selectSeat = (seat: Seat) => {
    if (seat.status !== "available") return;
    if (selectedSeats.some((s) => s.seatId === seat.seatId)) return;
    if (selectedSeats.length >= MAX_SEATS) return;
    setSelectedSeats((prev) => [...prev, seat]);
  };

  const cancelSeat = (seatId: string) => {
    setSelectedSeats((prev) => prev.filter((s) => s.seatId !== seatId));
    if (selectedSeats.length === 1) setExpiredAt(null);
  };

  const cancelAll = () => {
    setSelectedSeats([]);
    setExpiredAt(null);
  };

  // 결제하기 버튼 누를 때 사용할 함수
  const holdAll = async (): Promise<boolean> => {
  if (selectedSeats.length === 0) return false;
  try {
    await seatService.holdSeats(
      showScheduleId,
      selectedSeats.map((s) => Number(s.seatId))
    );
    return true;
  } catch {
    return false;
  }
};

  return { selectedSeats, expiredAt, selectSeat, cancelSeat, cancelAll, holdAll };
};