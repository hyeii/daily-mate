import { atom } from "recoil";

export const sideBarOpenState = atom<boolean>({
  key: "isSideBarOpen",
  default: false,
});
