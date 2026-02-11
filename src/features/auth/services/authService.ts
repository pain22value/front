import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
};

const signin = async (signinRequest: SigninRequest): Promise<SigninResponse> => {
  const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  if (!data.data) throw new Error(data.message || "로그인 데이터가 없습니다.");
  return data.data;
};

const signout = async (): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
};

const refresh = async (): Promise<SigninResponse> => {
  const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.REFRESH);
  if (!data.data) throw new Error(data.message || "토큰 갱신 데이터가 없습니다.");
  return data.data;
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
