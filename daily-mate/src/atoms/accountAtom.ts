import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { accountByDateResponse } from "../types/accountType";

const { persistAtom } = recoilPersist();

export const accountTabState = atom<string>({
  key: "accountTabComponent",
  default: "calendar",
  effects_UNSTABLE: [persistAtom],
});

export const selectedDateState = atom<string>({
  key: "selectedDate",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const openModalState = atom<boolean>({
  key: "openModal",
  default: false,
});

export const modalTypeState = atom<string>({
  key: "modalType",
  default: "",
});

export const modalOriginAccountState = atom<accountByDateResponse>({
  key: "originAccount",
  default: {
    accountId: 0,
    userId: 0,
    content: "",
    type: "",
    date: "",
    amount: 0,
    category: "",
  },
});
