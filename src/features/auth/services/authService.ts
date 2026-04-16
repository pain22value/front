import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const signup = async (signupRequest: SignupRequest): Promise<string | null> => {
  const { data } = await api.post<ApiResponse<string>>(ENDPOINTS.AUTH.SIGNUP, signupRequest);
  return data.data;
};

const signin = async (signinRequest: SigninRequest): Promise<SigninResponse> => {
  const { data } = await api.post<SigninResponse>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  if (!data) throw new Error("로그인 데이터가 없습니다.");
  return data;
  // const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  // if (!data || !data.data) throw new Error("로그인 데이터가 없습니다.");
  // return data.data;
};

const signout = async (): Promise<string | null> => {
  const { data } = await api.delete<ApiResponse<string>>(ENDPOINTS.AUTH.LOGOUT);
  return data.data;
};

const refresh = async (): Promise<SigninResponse> => {
  const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.REFRESH);
  if (!data.data) throw new Error(data.message || "토큰 갱신 데이터가 없습니다.");
  return data.data; // 실제 응답 반환 → accessToken + refreshToken 쿠키 갱신
};

const sendVerificationCode = async (email: string): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.EMAIL.SEND_CODE, { email });
};

const verifyEmail = async (email: string, code: string): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.EMAIL.VERIFY, { email, code });
};

// 소셜 추가 회원가입 완료
const socialSignupComplete = async (request: SocialSignupRequest): Promise<SigninResponse> => {
  const { data } = await api.post<SigninResponse>(ENDPOINTS.AUTH.OAUTH.SOCIAL_SIGNUP_COMPLETE, request);
  if (!data || !data.accessToken) throw new Error("소셜 회원가입 응답 데이터가 없습니다.");
  return data;
};

export const authService = {
  signup,
  signin,
  signout,
  refresh,
  sendVerificationCode,
  verifyEmail,
  socialSignupComplete,
};
