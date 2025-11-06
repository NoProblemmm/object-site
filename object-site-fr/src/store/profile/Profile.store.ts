import type { IUserInfo } from "@api/data-details";
import { makeAutoObservable } from "mobx";
import { type TProfileStore } from "./Profile.type";
import { DataHolder } from "@force-dev/utils";
import { Api } from "@api/Api";

class ProfileStore implements TProfileStore {
  public dataHolder = new DataHolder<IUserInfo>();

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this.dataHolder.d;
  }
  clear = () => {
    this.dataHolder.clear();
  };
  getProfile = async () => {
    this.dataHolder.setLoading();
    const response = await Api().getMyProfile();
    if (response.error) {
      this.dataHolder.setError(response.error.message);
    } else if (response) {
      this.dataHolder.setData(response);
      return response;
    }
    return undefined;
  };
}

export const useProfileStore = new ProfileStore();
