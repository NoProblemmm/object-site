import type { IUserInfo } from "@api/data-details";
import type { DataHolder } from "@force-dev/utils/types";

export type TProfileStore = TProfileState & TProfileMethods;

type TProfileState = {
  dataHolder: DataHolder<IUserInfo>;
  user?: IUserInfo;
};

type TProfileMethods = {
  getProfile(value: IUserInfo): void;
};
