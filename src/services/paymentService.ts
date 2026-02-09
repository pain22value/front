import api from '@/lib/api/axios';
import { ENDPOINTS } from '@/lib/api/endpoints';

const withOrderId = (path: string, orderId: string) =>
  path.replace(':orderId', encodeURIComponent(orderId));

export type SavePaymentInfoRequest = {
  orderName?: string;
  amount: number;
};

export type SavePaymentInfoResponse = {
  orderId: string;
  orderName: string;
  amount: number;
  status: 'PENDING';
};

export type ConfirmPaymentRequest = {
  paymentKey: string;
  amount: number;
};

export type ConfirmPaymentResponse = {
  orderId: string;
  status: 'CONFIRMED' | 'FAILED';
  approvedAt?: string;
  method?: string;
  totalAmount?: number;
  code?: string;
  message?: string;
};

export type CancelPaymentRequest = {
  reason?: string;
};

export type CancelPaymentResponse = {
  orderId: string;
  status: 'CANCELED';
  canceledAt?: string;
};

export type GetPaymentResponse = {
  orderId: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELED';
  orderName?: string;
  amount?: number;
  approvedAt?: string;
  method?: string;
  totalAmount?: number;
};

const saveInfo = async (
  body: SavePaymentInfoRequest,
): Promise<SavePaymentInfoResponse> => {
  const { data } = await api.post<SavePaymentInfoResponse>(
    ENDPOINTS.PAYMENTS.SAVE,
    body,
  );
  return data;
};

const confirm = async (
  orderId: string,
  body: ConfirmPaymentRequest,
): Promise<ConfirmPaymentResponse> => {
  const { data } = await api.post<ConfirmPaymentResponse>(
    withOrderId(ENDPOINTS.PAYMENTS.CONFIRM, orderId),
    body,
  );
  return data;
};

const get = async (orderId: string): Promise<GetPaymentResponse> => {
  const { data } = await api.get<GetPaymentResponse>(
    withOrderId(ENDPOINTS.PAYMENTS.GET, orderId),
  );
  return data;
};

const cancel = async (
  orderId: string,
  body?: CancelPaymentRequest,
): Promise<CancelPaymentResponse> => {
  const { data } = await api.post<CancelPaymentResponse>(
    withOrderId(ENDPOINTS.PAYMENTS.CANCEL, orderId),
    body ?? {},
  );
  return data;
};

export const paymentService = { saveInfo, confirm, get, cancel };
