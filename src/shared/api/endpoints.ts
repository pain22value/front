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
    SAVE: "/bookings/:reservationNumber/payment-ready",
    CONFIRM: "/payments/confirm",        // POST, body에 orderId 포함
    GET: "/payments/:orderId",           // GET
    CANCEL: "/payments/:orderId/cancel", // POST
    BANKS: "/payments/banks",            // GET
  },
  // 백엔드한테 요청 보낼 주소를 저장해둔것
  // seatService.ts에서 api.get(`${ENDPOINTS.SEATS.LIST}/${showId}/seats`) 이런 식으로 쓰임
  SEATS: {
    LIST:      "/ticketing/:showScheduleId",              // GET 좌석 배치도
    SHOW_INFO: "/ticketing/shows/:showScheduleId/seats",  // GET 공연 기본 정보
    ENTER:     "/ticketing/:showScheduleId/enter",        // POST 티켓팅 입장
    HOLD:      "/ticketing/:showScheduleId/hold/seat",    // POST 좌석 선점
    RELEASE:   "/ticketing/:showScheduleId/hold/seat",    // DELETE 좌석 반납
    HEARTBEAT: "/ticketing/:showScheduleId/heartbeat",    // POST 세션 연장
  },
  QUEUE: {
    ENTER: (showId: number | string) => `/queue/${showId}/enter`,
    STATUS: (showId: number | string) => `/queue/${showId}/status`,
  },
  SEARCH: {
    LIST: "/search",
  },
} as const;
