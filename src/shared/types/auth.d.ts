// 인증

type User = {
  email: string;
  name: string;
  role: string;
  provider: string | null;
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
  user: string;
  // user: User;
};
