import api from "@/shared/api/axios";
import { ENDPOINTS } from "@/shared/api/endpoints";

const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.SIGNUP, signupRequest);
};

const signin = async (signinRequest: SigninRequest): Promise<SigninResponse> => {
  return api.post<SigninResponse>(ENDPOINTS.AUTH.LOGIN, signinRequest);
};

const signout = async (): Promise<void> => {
  await api.post(ENDPOINTS.AUTH.LOGOUT);
};

const refresh = async (): Promise<SigninResponse> => {
  return api.post<SigninResponse>(ENDPOINTS.AUTH.REFRESH);
};

const sendVerificationCode = async (email: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.SEND_CODE, { email });
};

const verifyEmail = async (email: string, code: string): Promise<void> => {
  await api.post(ENDPOINTS.EMAIL.VERIFY, { email, code });
};

export const authService = { signup, signin, signout, refresh, sendVerificationCode, verifyEmail };
