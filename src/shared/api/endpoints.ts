export const ENDPOINTS = {
  // 홈
  HOME: {
    SHOWS: "/musical/home/shows",
    BANNERS: "/musical/home/banners",
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
    LIST: "/musical/shows",
    SCHEDULES: "/musical/shows/schedules",
    DETAIL: (showId: number | string) => `/musical/shows/${showId}`,
    REVIEWS: (showId: number | string) => `/musical/reviews/${showId}`,
    REVIEWS_META: (showId: number | string) => `/musical/reviews/${showId}/meta`,
    CASTING_SCHEDULES: (showId: number | string) => `/musical/shows/${showId}/casting-schedules`,
  },

  // 아티스트
  ARTISTS: {
    LIKE: (artistId: number | string) => `/musical/artists/${artistId}/likes`,
  },

  // 대기열
  QUEUE: {
    ENTER: (showId: number | string) => `/queue/${showId}/enter`,
    STATUS: (showId: number | string) => `/queue/${showId}/status`,
  },

  // 결제
  PAYMENTS: {
    SAVE: "/payments",
    CONFIRM: "/payments/:orderId/confirm",
    GET: "/payments/:orderId",
    CANCEL: "/payments/:orderId/cancel",
  },

  // 좌석
  // 백엔드한테 요청 보낼 주소를 저장해둔것
  // seatService.ts에서 api.get(`${ENDPOINTS.SEATS.LIST}/${showId}/seats`) 이런 식으로 쓰임
  SEATS: {
    LIST: "/shows", // /shows/{showId}/seats : 2/21/박영준
    RESERVE: "/shows", // /shows/{showId}/seats/{seatId}/reserve : 2/21/박영준
  },
} as const;
