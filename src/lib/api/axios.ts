import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ENDPOINTS } from "@/lib/api/endpoints";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true });
const refreshApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true });

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      // 갱신 요청 자체가 실패한 경우 무한 루프 방지
      if (originalRequest.url?.includes(ENDPOINTS.AUTH.REFRESH)) return Promise.reject(error);

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;

      try {
        // 1. 토큰 재발급 요청
        const { data } = await refreshApi.post<{ accessToken: string }>(ENDPOINTS.AUTH.REFRESH);
        const newAccessToken = data.accessToken;

        // 2. 인증상태 업데이트
        useAuthStore.setState({ accessToken: newAccessToken });

        // 3. 큐에 대기중인 요청 처리
        processQueue(null, newAccessToken);

        // 4. 실패한 요청 헤더 업데이트 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃 처리 및 큐 정리
        processQueue(refreshError, null);
        useAuthStore.setState({ accessToken: null, user: null });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
