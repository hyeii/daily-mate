import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const whoseDiaryState = atom<number>({
  key: "whoseDiary",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
