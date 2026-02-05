export const ENDPOINTS = {
  AUTH: {
    // // 개인 백엔드 엔드포인트
    // SIGNUP: "/auth/signup",
    // LOGIN: "/auth/login",
    // LOGOUT: "/auth/logout",
    // REFRESH: "/auth/refresh",

    // 5팀 백엔드 엔드포인트
    SIGNUP: "/auth/sign-up",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    ME: "/users/me",
  },
  EMAIL: {
    SEND_CODE: "/email",
    VERIFY: "/email/verify",
  },
} as const;
