import { useSetRecoilState } from "recoil";
import { userInfo, userResponse } from "../types/authType";
import {
  isLoginState,
  userImageURLState,
  userInfoState,
} from "../atoms/authAtom";

const useLogin = () => {
  const setIsLogged = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setUserImage = useSetRecoilState(userImageURLState);

  const LogIn = (signInResponse: userResponse) => {
    const logInUserInfo: userInfo = {
      userId: signInResponse.userId,
      nickname: signInResponse.nickName,
      email: signInResponse.email,
      profile: signInResponse.profile,
      type: signInResponse.type,
      providerId: signInResponse.providerId,
    };
    window.localStorage.setItem("accessToken", signInResponse.accessToken);
    window.localStorage.setItem("refreshToken", signInResponse.refreshToken);

    setUserInfo(logInUserInfo);
    setUserImage(signInResponse.image);
    setIsLogged(true);
  };

  return { LogIn };
};

export default useLogin;
