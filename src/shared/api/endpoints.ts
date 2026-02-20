export const ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/sign-up",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  EMAIL: {
    SEND_CODE: "/auth/email/send-code",
    VERIFY: "/auth/email/verify",
  },
  SHOWS: {
    RECOMMENDATIONS: "/shows/recommendations",
    LIST: "/shows",
    DETAIL: "/shows", // 뒤에 /{showId}를 붙여서 사용
  },
  PAYMENTS: {
    SAVE: '/payments',
    CONFIRM: '/payments/:orderId/confirm',
    GET: '/payments/:orderId',
    CANCEL: '/payments/:orderId/cancel',
  },
  SEATS: {
    LIST: "/shows",        // /shows/{showId}/seats : 2/21/박영준
    RESERVE: "/shows",     // /shows/{showId}/seats/{seatId}/reserve : 2/21/박영준
  },
} as const;
