import { makeAutoObservable } from "mobx";
import { Api } from "@api/Api";
import { DataHolder } from "@force-dev/utils";
import type { IUserInfo } from "@api/data-details";
import { type TProfileStore } from "./Profile.type";

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
    const response = await Api().getMyProfile();
    if (response.error) {
      this.dataHolder.setError(response.error.message);
    } else if (response) {
      this.dataHolder.setData(response);
      return response;
    }
    return undefined;
  };

  requestCompose = async () => {
    const userId = Number(this.user?.id);
    if (!userId) {
      return console.log("User not define");
    } else {
      const response = await Api().requestComposerUser(userId);
      if (response) {
        return response;
      } else {
        console.log("Server error");
      }
    }
  };

  setImageUser = async (file: any) => {
    const response = await Api().setAvatarUser(file);
    if (response) {
      return response;
    } else {
      console.log("Server error");
    }
  };
}

export const useProfileStore = new ProfileStore();
