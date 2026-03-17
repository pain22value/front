import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
};

const signin = async (
  signinRequest: SigninRequest,
): Promise<SigninResponse> => {
  const { data } = await api.post<ApiResponse<SigninResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    signinRequest,
  );
  if (!data.data) throw new Error("로그인 데이터가 없습니다.");
  return data.data; // 실제 응답 반환 → 백엔드가 Set-Cookie로 refreshToken 쿠키를 심음
};

const signout = async (): Promise<void> => {
  await api.delete(ENDPOINTS.AUTH.LOGOUT);
};

const refresh = async (): Promise<SigninResponse> => {
  const { data } = await api.post<ApiResponse<SigninResponse>>(
    ENDPOINTS.AUTH.REFRESH,
  );
  if (!data.data)
    throw new Error(data.message || "토큰 갱신 데이터가 없습니다.");
  return data.data; // 실제 응답 반환 → accessToken + refreshToken 쿠키 갱신
};

const sendVerificationCode = async (email: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.SEND_CODE, { email });
};

const verifyEmail = async (email: string, code: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.VERIFY, { email, code });
};

export const authService = {
  signup,
  signin,
  signout,
  refresh,
  sendVerificationCode,
  verifyEmail,
};
