type User = {
  email: string;
  name: string;
  // roles: string[];
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
