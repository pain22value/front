import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
};

const signin = async (signinRequest: SigninRequest): Promise<SigninResponse> => {
  const { data } = await api.post<SigninResponse>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  // const { data } = await api.post<ApiResponse<SigninResponse>>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  // console.log({ data });
  if (!data) throw new Error("로그인 데이터가 없습니다.");
  return data;
};

const signout = async (): Promise<void> => {
  const { user, accessToken } = useAuthStore.getState();

  // 로그인 상태가 아니면 서버에 요청을 보낼 필요가 없습니다.
  if (!user || !accessToken) {
    return;
  }

  await api.delete(ENDPOINTS.AUTH.LOGOUT, {
    headers: {
      "X-User-Id": 1, // 참고: 현재 useAuthStore의 user가 accessToken으로 설정되어 있어 수정이 필요합니다.
      // "X-User-Id": user, // 참고: 현재 useAuthStore의 user가 accessToken으로 설정되어 있어 수정이 필요합니다.
      "X-Token": accessToken,
    },
  });
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
