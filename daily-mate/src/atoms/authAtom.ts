import { atom } from "recoil";

export const userNicknameState = atom({
  key: "nickname",
  default: "감자",
});

export const userFriendsCountState = atom({
  key: "friendsCount",
  default: 10,
});
