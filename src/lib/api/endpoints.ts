export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    ME: '/users/me',
  },
  PAYMENTS: {
    SAVE: '/payments',
    CONFIRM: '/payments/:orderId/confirm',
    GET: '/payments/:orderId',
    CANCEL: '/payments/:orderId/cancel',
  },
} as const;
