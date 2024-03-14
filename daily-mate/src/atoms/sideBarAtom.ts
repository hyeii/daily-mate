import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const sideBarOpenState = atom<boolean>({
  key: "isSideBarOpen",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
