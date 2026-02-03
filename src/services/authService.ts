import api from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";

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

export const authService = { signup, signin, signout, refresh };
