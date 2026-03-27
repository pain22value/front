// 닉네임 변경 요청 타입
type UpdateNicknameRequest = {
  nickname: string;
};

// 마케팅 정보 수신 동의 변경 요청 타입
type UpdateMarketingConsentRequest = {
  marketingInfoAgreed: boolean;
};

// 이메일 알림 수신 동의 변경 요청 타입
type UpdateEmailNotificationRequest = {
  emailNotificationAgreed: boolean;
};
