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

export type BookingDetail = Booking & {
  finalAmount: number;
  items: BookingItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentAmount: number;
  freeCancelDeadline: string;
  admissionInfo: string[];
  performanceDatetime: Date;
};

export const STATUS_LABEL: Record<BookingStatus, string> = {
  CONFIRMED: "예매확정",
  PENDING_PAYMENT: "입금대기",
  PARTIAL_CANCEL: "부분취소",
  CANCELED: "취소",
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