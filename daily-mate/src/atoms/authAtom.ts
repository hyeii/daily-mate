import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userInfo } from "../types/authType";

const { persistAtom } = recoilPersist();

// 회원 정보 관련
// {
// 	"accessToken" : String, => 인터셉터
// 	"refreshToken" : String, => refreshTokenState
// 	"email" : String,
// 	"nickName" : String,
// 	"image" : String, => imageState
// 	"profile" : String,
// 	"type" : String
// }
// => 여기에 userId 추가

export const isLoginState = atom<boolean>({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<userInfo>({
  key: "userInfo",
  default: {
    userId: -1,
    nickname: "",
    email: "",
    profile: "",
    type: "",
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
