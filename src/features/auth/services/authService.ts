import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
};

const signin = async (signinRequest: SigninRequest): Promise<SigninResponse> => {
  const {
    data: { accessToken, user },
  } = await api.post<SigninResponse>(ENDPOINTS.AUTH.LOGIN, signinRequest);
  return { accessToken, user };
};

const signout = async (): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
};

const refresh = async (): Promise<SigninResponse> => {
  const {
    data: { accessToken, user },
  } = await api.post<SigninResponse>(ENDPOINTS.AUTH.REFRESH);
  return { accessToken, user };
};

const sendVerificationCode = async (email: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.SEND_CODE, { email });
};

const verifyEmail = async (email: string, code: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.VERIFY, { email, code });
};

export const authService = { signup, signin, signout, refresh, sendVerificationCode, verifyEmail };
