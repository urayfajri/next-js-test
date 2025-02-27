export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  access_token: string;
};
