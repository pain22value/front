// 인증

type User = {
  email: string;
  nickname: string;
  marketingInfoAgreed: boolean;
  emailNotificationAgreed: boolean;
  // provider: string | null;
};

type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
  serviceTermsAgreed: boolean;
  electronicFinanceTermsAgreed: boolean;
  privacyCollectionAgreed: boolean;
  marketingInfoAgreed: boolean;
  over14Agreed: boolean;
};

type SigninRequest = {
  email: string;
  password: string;
};

type SigninResponse = {
  accessToken: string;
};

type SignupTerms = {
  serviceTermsAgreed: boolean;
  electronicFinanceTermsAgreed: boolean;
  privacyCollectionAgreed: boolean;
  marketingInfoAgreed: boolean;
  over14Agreed: boolean;
};

// 소셜 로그인 콜백에서 신규 회원일 때 전달받는 데이터
type SocialSignupData = {
  provider: string;
  email: string;
  registrationToken: string;
};

// 소셜 추가 회원가입 요청 바디
type SocialSignupRequest = {
  registrationToken: string;
  email: string;
  nickname: string;
  serviceTermsAgreed: boolean;
  electronicFinanceTermsAgreed: boolean;
  privacyCollectionAgreed: boolean;
  marketingInfoAgreed: boolean;
  over14Agreed: boolean;
};
