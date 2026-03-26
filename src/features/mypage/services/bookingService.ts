import api from "@/shared/api/axios";
import { Booking, BookingStatus } from "@/shared/types/booking";

// ─── API 응답 타입 ────────────────────────────────────────────
interface ApiBookingStatus {
  label: string;
  subText: string;
}

interface ApiBookingShow {
  posterUrl: string;
  title: string;
  showDate: string;
  showTime: string;
  venueName: string;
}

interface ApiBooking {
  reservationNumber: string;
  reservationDate: string;
  status: ApiBookingStatus;
  show: ApiBookingShow;
  gradeSummary: string;
  showId: number;
  canCancel: boolean;
  canReview: boolean;
  needsDeposit: boolean;
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// ─── API → Booking 타입 변환 ─────────────────────────────────
const toBookingStatus = (label: string): BookingStatus => {
  if (label === "예매확정") return "CONFIRMED";
  if (label === "입금대기") return "PENDING_PAYMENT";
  if (label === "부분취소") return "PARTIAL_CANCEL";
  if (label === "예매취소") return "CANCELED";
  if (label === "관람완료") return "WATCHED";
  return "CONFIRMED";
};

const adaptBooking = (api: ApiBooking): Booking => ({
  id: api.reservationNumber,
  orderId: api.reservationNumber,
  bookedAt: api.reservationDate,
  status: toBookingStatus(api.status.label),
  showId: String(api.showId),
  show: {
    title: api.show.title,
    venue: api.show.venueName,
    address: "",
    date: api.show.showDate,
    time: api.show.showTime,
    seat: api.gradeSummary,
    posterUrl: api.show.posterUrl,
  },
});

// ─── API 함수 ─────────────────────────────────────────────────
const getBookings = async (from?: string, to?: string): Promise<Booking[]> => {
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  const { data } = await api.get<ApiResponse<ApiBooking[]>>(
    `/bookings?${params.toString()}`,
    {
      headers: {
        "X-User-Id": "6353c1b6-e965-4191-a5bf-82fdfab48838", // ← 하드코딩
      }
    }
  );
  return data.data.map(adaptBooking);
};

export const bookingService = { getBookings };