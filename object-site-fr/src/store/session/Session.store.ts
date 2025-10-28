import { DataHolder } from "@force-dev/utils";
import type { TSessionStore } from "./Session.type";
import { makeAutoObservable } from "mobx";
import type { ISignInRequest, ISignInResponse } from "../../api/data-details";
import {
  ApiTokenProvider,
  useApiTokenProvider,
} from "../../api/ApiToken.provider";
import { Api } from "../../api/Api";

class SessionStore implements TSessionStore {
  public dataHolder = new DataHolder<string | null>(null);

  constructor(private _tokenProvider: ApiTokenProvider) {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this.dataHolder.isLoading;
  }

  get isAutentificate() {
    return this.dataHolder.isFilled;
  }

  public refreshSession = async () => {
    try {
      await useApiTokenProvider.refreshAccessToken();
      this.dataHolder.setData(useApiTokenProvider.accessToken);
      return this._tokenProvider.accessToken;
    } catch (e) {
      console.log(e);
    }
  };

  public signInStore = async (data: ISignInRequest) => {
    if (!data) {
      return alert("Неверные данные");
    }
    const response = await Api().signIn(data);
    this._dataResponse(response);
    return response;
  };

  public clear = () => {
    this.dataHolder.clear();
    localStorage.removeItem("refresh_token");
  };
  public isLogout = () => {
    this.clear();
  };
  private _dataResponse(data: ISignInResponse): void {
    if (data === null) {
      this._tokenProvider.clear();
      this.dataHolder.setError("Нет данных");
    } else if (data) {
      this._tokenProvider.setToken(data.accessToken, data.refreshToken);
      this.dataHolder.setData(this._tokenProvider.accessToken);
    }
  }
}

export const useSessionStore = new SessionStore(new ApiTokenProvider());
