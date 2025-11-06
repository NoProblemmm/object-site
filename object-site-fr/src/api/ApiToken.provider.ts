import { makeAutoObservable } from "mobx";
import axios from "axios";
import { Api } from "./Api";
import type { IApiTokenProvider } from "./data-details";

export class ApiTokenProvider implements IApiTokenProvider {
  public accessToken = "";
  public refreshToken = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuthToken = (token: string | null) => {
    token
      ? (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
      : axios.defaults.headers.common["Authorization"];
  };

  setToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.setAuthToken(accessToken);
    if (refreshToken !== undefined && refreshToken !== "") {
      localStorage.setItem("refresh_token", refreshToken);
      this.refreshToken = refreshToken;
    }
  }

  refreshAccessToken = async () => {
    try {
      const response = await Api().refreshToken();
      if (response.accessToken && response.refreshToken) {
        return this.setToken(response.accessToken, response.refreshToken);
      } else {
        return this.setToken(response.accessToken, this.refreshToken);
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
    }
  };

  clear() {
    this.accessToken = "";
    localStorage.removeItem("refresh_token");
    this.refreshToken = "";
  }
}

export const useApiTokenProvider = new ApiTokenProvider();
