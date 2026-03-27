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
