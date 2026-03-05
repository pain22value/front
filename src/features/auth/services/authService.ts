import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import axios, { AxiosError } from "axios";

/** AxiosError → 서버 메시지 추출, 일반 Error → 그대로, 그 외 → fallback */
const extractServerError = (
  error: unknown,
  fallback = "서버와의 통신 중 문제가 발생했습니다.",
): Error => {
  if (axios.isAxiosError(error)) {
    const message =
      (error as AxiosError<{ message?: string }>).response?.data?.message ??
      fallback;
    return new Error(message);
  }
  if (error instanceof Error) return error;
  return new Error(fallback);
};

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  try {
    await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
  } catch (error) {
    throw extractServerError(error);
  }
};

const signin = async (
  signinRequest: SigninRequest,
): Promise<SigninResponse> => {
  try {
    const { data } = await api.post<SigninResponse>(
      ENDPOINTS.AUTH.LOGIN,
      signinRequest,
    );
    // const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.LOGIN, signinRequest);
    console.log({ data });
    if (!data) throw new Error("로그인 데이터가 없습니다.");
    return data;
  } catch (error) {
    throw extractServerError(error, "로그인에 실패했습니다.");
  }
};

const signout = async (): Promise<void> => {
  const { user, accessToken } = useAuthStore.getState();

  // 로그인 상태가 아니면 서버에 요청을 보낼 필요가 없습니다.
  if (!user || !accessToken) {
    return;
  }

  try {
    await api.delete(ENDPOINTS.AUTH.LOGOUT, {
      headers: {
        "X-User-Id": 1, // 참고: 현재 useAuthStore의 user가 accessToken으로 설정되어 있어 수정이 필요합니다.
        // "X-User-Id": user, // 참고: 현재 useAuthStore의 user가 accessToken으로 설정되어 있어 수정이 필요합니다.
        "X-Token": accessToken,
      },
    });
  } catch (error) {
    throw extractServerError(error, "로그아웃 처리 중 문제가 발생했습니다.");
  }
};

const refresh = async (): Promise<SigninResponse> => {
  try {
    const { data } = await api.post<ApiResponse<SigninResponse>>(
      ENDPOINTS.AUTH.REFRESH,
    );
    if (!data.data)
      throw new Error(data.message || "토큰 갱신 데이터가 없습니다.");
    return data.data;
  } catch (error) {
    throw extractServerError(error, "토큰 갱신 중 문제가 발생했습니다.");
  }
};

const sendVerificationCode = async (email: string): Promise<void> => {
  try {
    await api.post(ENDPOINTS.EMAIL.SEND_CODE, { email });
  } catch (error) {
    throw extractServerError(error, "인증코드 발송 중 문제가 발생했습니다.");
  }
};

const verifyEmail = async (email: string, code: string): Promise<void> => {
  try {
    await api.post(ENDPOINTS.EMAIL.VERIFY, { email, code });
  } catch (error) {
    throw extractServerError(error, "이메일 인증 중 문제가 발생했습니다.");
  }
};

export const authService = {
  signup,
  signin,
  signout,
  refresh,
  sendVerificationCode,
  verifyEmail,
};
