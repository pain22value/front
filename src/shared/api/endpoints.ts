export const ENDPOINTS = {
  // 홈
  HOME: {
    SHOWS: "/musical/home/shows",
    BANNERS: "/musical/home/banners",
    PROMOTIONS: "/musical/home/promotions",
  },

  // 인증
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
  PROFILE: {
    ME: "/auth/me",
    NICKNAME: "/auth/me/nickname",
    MARKETING_CONSENT: "/auth/me/marketing-consent",
    EMAIL_NOTIFICATION: "/auth/me/email-notification",
  },

  // 검색
  SEARCH: {
    LIST: "/musical/search",
  },

  // 공연
  SHOWS: {
    LIST: "/musical/home/shows",
    SCHEDULES: "/musical/shows/schedules",
    DETAIL: (showId: number | string) => `/musical/shows/${showId}`,
    REVIEWS: (showId: number | string) => `/musical/reviews/${showId}`,
    REVIEWS_META: (showId: number | string) => `/musical/reviews/${showId}/meta`,
    CASTING_SCHEDULES: (showId: number | string) => `/musical/shows/${showId}/casting-schedules`,
  },

  // 아티스트
  ARTISTS: {
    DETAIL: (artistId: number | string) => `/musical/artists/${artistId}`,
    LIKE: (artistId: number | string) => `/musical/artists/${artistId}/likes`,
    PAST_SHOWS: (artistId: number | string) => `/musical/artists/${artistId}/past-shows`,
    MEMBERSHIP_PAYMENT: (artistId: number | string) => `/musical/artists/${artistId}/membership/payment`,
  },

  // 대기열
  QUEUE: {
    ENTER: (scheduleId: number | string) => `/queue/${scheduleId}/enter`,
    STATUS: (scheduleId: number | string) => `/queue/${scheduleId}/status`,
    CANCEL: (scheduleId: number | string) => `/queue/${scheduleId}/cancel`,
  },


  // 결제
  PAYMENTS: {
    SAVE: "/bookings/:reservationNumber/payment-ready",
    CONFIRM: "/payments/confirm", // POST, body에 orderId 포함
    GET: "/payments/:orderId", // GET
    CANCEL: "/payments/:orderId/cancel", // POST
    BANKS: "/payments/banks", // GET
  },

  // 좌석
  // 백엔드한테 요청 보낼 주소를 저장해둔것
  // seatService.ts에서 api.get(`${ENDPOINTS.SEATS.LIST}/${showId}/seats`) 이런 식으로 쓰임
  SEATS: {
    LIST: "/ticketing/:showScheduleId", // GET 좌석 배치도
    SHOW_INFO: "/ticketing/shows/:showScheduleId/seats", // GET 공연 기본 정보
    ENTER: "/ticketing/:showScheduleId/enter", // POST 티켓팅 입장
    HOLD: "/ticketing/:showScheduleId/hold/seat", // POST 좌석 선점
    RELEASE: "/ticketing/:showScheduleId/hold/seat", // DELETE 좌석 반납
    HEARTBEAT: "/ticketing/:showScheduleId/heartbeat", // POST 세션 연장
  },

  // 텔레메트리 (프록시 경로 사용)
  TELEMETRY: "/telemetry",
} as const;
