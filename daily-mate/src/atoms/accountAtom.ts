import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
