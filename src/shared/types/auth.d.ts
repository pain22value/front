type User = {
  email: string;
  name: string;
  role: string;
  provider: string | null;
};

type SignupRequest = {
  email: string;
  password: string;
  name: string;
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
