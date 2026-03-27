import api from "@/shared/api/axios";
import { Booking, BookingDetail, BookingStatus } from "@/shared/types/booking";

// ─── API 응답 타입 ────────────────────────────────────────────
interface ApiBookingStatus {
  label: string;
  subText: string | null;
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

interface ApiBookingDetail {
  reservationNumber: string;
  status: { label: string; subText: string | null };
  show: {
    posterUrl: string;
    title: string;
    showDate: string;
    showTime: string;
    venueName: string;
  };
  gradeSummary: string;
  price: {
    ticketUnitPrices: number[];
    serviceFee: number;
    totalPrice: number;
    gradePrices: { grade: string; count: number; totalPrice: number }[];
  };
  payment: {
    paymentMethod: string | null;
    paidAt: string | null;
    virtualAccount: {
      accountNumber: string;
      bank: string;
      customerName: string;
      dueDate: string;
    } | null;
  };
  cancel: {
    seats: string[];
    cancelFee: number;
    refundAmount: number;
    canceledAt: string;
    method: string;
  } | null;
}

interface ApiBookingOrder {
  reservationNumber: string;
  show: {
    posterUrl: string;
    title: string;
    showDate: string;
    showTime: string;
    venueName: string;
  };
  price: {
    ticketUnitPrices: number[];
    serviceFee: number;
    totalPrice: number;
    gradePrices: { grade: string; count: number; totalPrice: number }[];
  };
  gradeSeats: {
    grade: string;
    price: number;
    count: number;
    seatDetails: string[];
  }[];
}

interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// ─── export 타입 ──────────────────────────────────────────────
export interface BookingOrderItem {
  name: string;    // 좌석명 (예: "1층 1F-B구역 19열 1번")
  grade: string;   // 등급
  amount: number;  // 가격
}

export interface BookingOrder {
  reservationNumber: string;
  show: {
    title: string;
    showDate: string;
    showTime: string;
    venueName: string;
  };
  items: BookingOrderItem[];
  totalPrice: number;
  serviceFee: number;
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

const adaptBookingDetail = (apiData: ApiBookingDetail): BookingDetail => ({
  id: apiData.reservationNumber,
  orderId: apiData.reservationNumber,
  bookedAt: apiData.show.showDate,
  status: toBookingStatus(apiData.status.label),
  showId: "",
  show: {
    title: apiData.show.title,
    venue: apiData.show.venueName,
    address: "",
    date: apiData.show.showDate,
    time: apiData.show.showTime,
    seat: apiData.gradeSummary,
    posterUrl: apiData.show.posterUrl,
  },
  finalAmount: apiData.price.totalPrice,
  totalAmount: apiData.price.totalPrice,
  items: [
    ...apiData.price.gradePrices.map((g) => ({
      name: `${g.grade}석`,
      quantity: g.count,
      amount: g.totalPrice,
    })),
    { name: "예매 수수료", quantity: null, amount: apiData.price.serviceFee },
  ],
  paymentInfo: apiData.payment.virtualAccount
    ? {
        type: "VIRTUAL_ACCOUNT" as const,
        depositName: apiData.payment.virtualAccount.customerName,
        bankAccount: `${apiData.payment.virtualAccount.bank} ${apiData.payment.virtualAccount.accountNumber} (TRUVE)`,
        depositDeadline: apiData.payment.virtualAccount.dueDate,
        amount: apiData.price.totalPrice,
      }
    : {
        type: "CARD" as const,
        method: apiData.payment.paymentMethod ?? "카드",
        amount: apiData.price.totalPrice,
        orderedAt: apiData.payment.paidAt ?? "",
      },
  guideTitle: "입장 안내",
  guideItems: [
    "공연 시작 1시간 전부터 입장 가능합니다",
    "본인 확인을 위해 신분증을 지참해주세요",
    "QR코드 캡처 화면은 입장 불가합니다",
  ],
  cancelInfo: apiData.cancel
    ? {
        refundAmount: apiData.cancel.refundAmount,
        cancelFee: apiData.cancel.cancelFee,
        canceledSeats: apiData.cancel.seats,
        canceledAt: apiData.cancel.canceledAt,
      }
    : undefined,
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
        "X-User-Id": "6353c1b6-e965-4191-a5bf-82fdfab48838",
      },
    }
  );
  return data.data.map(adaptBooking);
};

const getBookingDetail = async (reservationNumber: string): Promise<BookingDetail> => {
  const { data } = await api.get<ApiResponse<ApiBookingDetail>>(
    `/bookings/${reservationNumber}`
  );
  return adaptBookingDetail(data.data);
};

const getBookingOrder = async (reservationNumber: string): Promise<BookingOrder> => {
  const { data } = await api.get<ApiResponse<ApiBookingOrder>>(
    `/bookings/${reservationNumber}/order`
  );
  const apiData = data.data;

  const items: BookingOrderItem[] = apiData.gradeSeats.flatMap((gs) =>
    gs.seatDetails.map((seat) => ({
      name: seat,
      grade: gs.grade,
      amount: gs.price,
    }))
  );

  return {
    reservationNumber: apiData.reservationNumber,
    show: apiData.show,
    items,
    totalPrice: apiData.price.totalPrice,
    serviceFee: apiData.price.serviceFee,
  };
};

export const bookingService = { getBookings, getBookingDetail, getBookingOrder };