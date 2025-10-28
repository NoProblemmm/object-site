import type { ISignInRequest } from "../../api/data-details";

export type TSessionStore = TSessinState & TSessionMethods;

type TSessinState = {
  isLoading: boolean;
  isAutentificate: boolean;
};

type TSessionMethods = {
  signInStore(params: ISignInRequest): Promise<void>;
  isLogout(): void;
  clear(): void;
};
