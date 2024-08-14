export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  accessToken: string;
}

export interface ApiResponseUser {
  user: CurrentUser;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

export interface Content {
  user: User;
  token: string;
}
