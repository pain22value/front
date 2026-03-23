export const ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/sign-up",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/reissue",
  },
  OAUTH: {
    KAKAO: "/auth/kakao/login",
    NAVER: "/auth/naver/login",
    GOOGLE: "/auth/google/login",
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
    SAVE: "/payments",
    CONFIRM: "/payments/confirm",        // POST, body에 orderId 포함
    GET: "/payments/:orderId",           // GET
    CANCEL: "/payments/:orderId/cancel", // POST
    BANKS: "/payments/banks",            // GET
  },
  // 백엔드한테 요청 보낼 주소를 저장해둔것
  // seatService.ts에서 api.get(`${ENDPOINTS.SEATS.LIST}/${showId}/seats`) 이런 식으로 쓰임
  SEATS: {
    LIST: "/shows", // /shows/{showId}/seats : 2/21/박영준
    RESERVE: "/shows", // /shows/{showId}/seats/{seatId}/reserve : 2/21/박영준
  },
  QUEUE: {
    ENTER: (showId: number | string) => `/queue/${showId}/enter`,
    STATUS: (showId: number | string) => `/queue/${showId}/status`,
  },
  SEARCH: {
    LIST: "/search",
  },
} as const;
