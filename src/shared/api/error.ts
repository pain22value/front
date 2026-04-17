import axios from "axios";

type ApiErrorData = {
  errorType?: string;
  message?: string;
  code?: string;
};

const isApiErrorData = (value: unknown): value is ApiErrorData =>
  typeof value === "object" && value !== null;

export const getApiErrorData = (error: unknown): ApiErrorData | null => {
  if (!axios.isAxiosError(error)) return null;

  const data = error.response?.data;
  if (!isApiErrorData(data)) return null;
  return data;
};

export const getApiErrorCode = (error: unknown): string | null =>
  getApiErrorData(error)?.code ?? null;

export const getApiErrorMessage = (error: unknown): string | null =>
  getApiErrorData(error)?.message ?? null;

export const isApiErrorCode = (error: unknown, code: string): boolean =>
  getApiErrorCode(error) === code;
