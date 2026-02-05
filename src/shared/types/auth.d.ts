interface User {
  email: string;
  name: string;
  // roles: string[];
}

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
  user: User;
}
