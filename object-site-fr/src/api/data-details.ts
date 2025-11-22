export type IUserInfo = {
  id: number;
  name: string;
  image?: string;
  email: string;
  isAuthor: boolean;
  password: string;
  admin: boolean;
  requestComposer: boolean;
};

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignInResponse {
  id: number;
  name: string;
  image: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface IRequestApi<T> {
  body: T;
  limit?: number;
}

export interface IResponseApi<T> {
  data?: T;
  message?: string;
}

export interface IApiTokenProvider {
  accessToken: string;
  refreshToken: string;

  setToken(accessToken: string, refreshToken: string): void;
  setAuthToken(token: string): void;
  clear(): void;
}
