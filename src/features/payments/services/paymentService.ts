import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { v4 as uuidv4 } from "uuid";

const withOrderId = (path: string, orderId: string) =>
  path.replace(":orderId", encodeURIComponent(orderId));

// ─── 공통 응답 래퍼 ───────────────────────────────────────────
interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// ─── 결제 승인 ────────────────────────────────────────────────
export interface ConfirmPaymentRequest {
  orderId: string;
  paymentKey: string;
  amount: number;
}

export interface ConfirmPaymentResponse {
  orderId: string;
}

// ─── 결제 상세 조회 ───────────────────────────────────────────
export type PaymentStatus =
  | "READY"
  | "IN_PROGRESS"
  | "WAITING_FOR_DEPOSIT"
  | "DONE"
  | "CANCELED"
  | "PARTIAL_CANCELED"
  | "ABORTED"
  | "EXPIRED";

export interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  customerName: string;
  dueDate: string;
  displayDueDate: string;
  remainingTime: string;
}

export interface Card {
  cardCompanyName: string;
  number: string;
  installmentPlanMonths: number;
}

export interface CancelDetail {
  requestAmount: number;
  refundFee: number;
  refundAmount: number;
  cancelReason: string;
  canceledAt: string;
  transactionKey: string;
  cancelStatus: string;
}

export interface PaymentDetail {
  orderId: string;
  paymentKey: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  cancelableAmount: number;
  virtualAccount?: VirtualAccount;
  card?: Card;
  easyPay?: { provider: string; discountAmount: number };
  failReason?: string;
  requestedAt: string;
  approvedAt: string;
  cancels: CancelDetail[];
}

// ─── 예매 내역 생성 ───────────────────────────────────────────
export interface CreateBookingRequest {
  seatIds: number[];
}

const createBooking = async (body: CreateBookingRequest): Promise<string> => {
  const { data } = await api.post<ApiResponse<{ reservationNumber: string }>>(
    "/bookings",
    body,
    {
      headers: {
        "X-User-Id": "6353c1b6-e965-4191-a5bf-82fdfab48838", // 랜덤 UUID 추가
      }
    }
  );
  return data.data.reservationNumber;
};

// ─── 결제 취소 ────────────────────────────────────────────────
export interface RefundReceiveAccount {
  bankCode: string;
  accountNumber: string;
  holderName: string;
}

export interface CancelPaymentRequest {
  cancelReason: string;
  cancelAmount: number;
  refundReceiveAccount?: RefundReceiveAccount; // 가상계좌 취소 시 필수
}

export type CancelPaymentResponse = CancelDetail;

// ─── 은행 목록 ────────────────────────────────────────────────
export interface Bank {
  bankCode: string;
  bankName: string;
}

// ─── API 함수 ─────────────────────────────────────────────────

// 결제 승인 (Toss 콜백 후 호출)
const confirm = async (
  body: ConfirmPaymentRequest
): Promise<ConfirmPaymentResponse> => {
  const { data } = await api.post<ApiResponse<ConfirmPaymentResponse>>(
    ENDPOINTS.PAYMENTS.CONFIRM,
    body
  );
  return data.data;
};

// 결제 상세 조회
const get = async (orderId: string): Promise<PaymentDetail> => {
  const { data } = await api.get<ApiResponse<PaymentDetail>>(
    withOrderId(ENDPOINTS.PAYMENTS.GET, orderId)
  );
  return data.data;
};

// 결제 취소
const cancel = async (
  orderId: string,
  body: CancelPaymentRequest
): Promise<CancelPaymentResponse> => {
  const { data } = await api.post<ApiResponse<CancelPaymentResponse>>(
    withOrderId(ENDPOINTS.PAYMENTS.CANCEL, orderId),
    body,
    {
      headers: { "Idempotency-Key": uuidv4() },
    }
  );
  return data.data;
};

// 은행 목록 조회
const getBanks = async (): Promise<Bank[]> => {
  const { data } = await api.get<ApiResponse<Bank[]>>(
    ENDPOINTS.PAYMENTS.BANKS
  );
  return data.data;
};

export interface PaymentReadyRequest {
  name: string;
  birthDate: string;
  email: string;
  phone: string;
}

const save = async (reservationNumber: string, body: PaymentReadyRequest): Promise<void> => {
  await api.post(
    ENDPOINTS.PAYMENTS.SAVE.replace(":reservationNumber", encodeURIComponent(reservationNumber)),
    body
  );
};

export const paymentService = { save, confirm, get, cancel, getBanks, createBooking };