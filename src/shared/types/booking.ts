export type BookingStatus =
  | "CONFIRMED"
  | "PENDING_PAYMENT"
  | "PARTIAL_CANCEL"
  | "CANCELED"
  | "WATCHED";

export type Booking = {
  id: string;
  orderId: string;
  bookedAt: string;
  status: BookingStatus;
  showId: string;
  dueTime?: string;
  entryTime?: string;
  show: {
    title: string;
    venue: string;
    date: string;
    time: string;
    seat: string;
    posterUrl?: string;
  };
};

export type BookingItem = {
  name: string;
  quantity: number | null;
  amount: number;
};

// 결제 정보: 일반 결제 (카드/토스페이 등)
export type CardPaymentInfo = {
  type: "CARD";
  method: string;       // e.g. "토스페이"
  amount: number;
  orderedAt: string;    // e.g. "2026.01.25.(월) 12:34:07"
};

// 결제 정보: 무통장 입금
export type VirtualAccountPaymentInfo = {
  type: "VIRTUAL_ACCOUNT";
  depositName: string;        // 입금자명
  bankAccount: string;        // 계좌번호 e.g. "우리은행 26109854118255 (TRUVE)"
  depositDeadline: string;    // 입금 마감일시 e.g. "2026.01.26.(월) 23:59까지"
  amount: number;
};

export type PaymentInfo = CardPaymentInfo | VirtualAccountPaymentInfo;

export type BookingDetail = Booking & {
  finalAmount: number;
  items: BookingItem[];
  totalAmount: number;
  paymentInfo: PaymentInfo;
  freeCancelDeadline?: string;    // CONFIRMED 일 때만
  guideTitle: string;             // 안내 박스 제목 e.g. "입장 안내" | "결제 안내"
  guideItems: string[];           // 안내 박스 내용
  performanceDatetime?: Date;     // CONFIRMED 카운트다운용
  depositDeadline?: Date;         // PENDING_PAYMENT 카운트다운용
};

export const STATUS_LABEL: Record<BookingStatus, string> = {
  CONFIRMED: "예매확정",
  PENDING_PAYMENT: "입금대기",
  PARTIAL_CANCEL: "부분취소",
  CANCELED: "예매취소",
  WATCHED: "관람완료",
};

export const STATUS_COLOR: Record<BookingStatus, string> = {
  CONFIRMED: "text-[#23222A] text-[16px] font-bold",
  PENDING_PAYMENT: "text-[#0B9B9D] text-[16px] font-bold",
  PARTIAL_CANCEL: "text-[#F11322] text-[16px] font-bold",
  CANCELED: "text-[#F11322] text-[16px] font-bold",
  WATCHED: "text-[#23222A] text-[16px] font-bold",
};

export const STATUS_BG: Record<BookingStatus, string> = {
  CONFIRMED: "bg-[#FFFFFF] border-[#DDDDE4]",
  PENDING_PAYMENT: "bg-[#FFFFFF] border-[#DDDDE4]",
  PARTIAL_CANCEL: "bg-[#FFFFFF] border-[#DDDDE4]",
  CANCELED: "bg-[#FFFFFF] border-[#DDDDE4]",
  WATCHED: "bg-[#FFFFFF] border-[#DDDDE4]",
};