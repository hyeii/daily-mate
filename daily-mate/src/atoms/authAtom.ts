import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userInfo } from "../types/authType";

const { persistAtom } = recoilPersist();

// 회원 정보 관련
// - 이메일, 닉네임, 한줄소개, 프로필사진, 소셜로그인종류(아니라면x), 친구 수

export const isLoginState = atom<boolean>({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<userInfo>({
  key: "userInfo",
  default: {
    userId: 1,
    nickname: "당근",
    email: "hyehye@dailymate.com",
    profileMessage: "한줄소개입니다",
    loginType: "카카오",
    friendsCount: 10,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userImageURLState = atom({
  key: "imageURL",
  default: "url",
});

export const refreshTokenState = atom({
  key: "refreshToken",
  default: "",
});

// export const userNicknameState = atom({
//   key: "nickname",
//   default: "감자",
// });

// export const userFriendsCountState = atom({
//   key: "friendsCount",
//   default: 10,
// });

// export const userEmailState = atom({
//   key: "email",
//   default: "hyehye@dailymate.com",
// });

// export const userProfileMessageState = atom({
//   key: "profileMessage",
//   default: "한줄소개입니다",
// });
