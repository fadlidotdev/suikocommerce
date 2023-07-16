export type APILoginParams = {
  username: string;
  password: string;
};

export type APILoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
