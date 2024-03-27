import { useSetRecoilState } from "recoil";
import {
  isLoginState,
  userImageURLState,
  userInfoState,
} from "../atoms/authAtom";
import { sideBarOpenState } from "../atoms/sideBarAtom";

const useLogOut = () => {
  const setIsLogged = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setUserImage = useSetRecoilState(userImageURLState);
  const setSidebarOpen = useSetRecoilState(sideBarOpenState);

  const LogOut = () => {
    setUserInfo({
      userId: -1,
      nickname: "",
      email: "",
      profile: "",
      type: "",
      providerId: "",
    });
    setIsLogged(false);
    setSidebarOpen(false);
    setUserImage("");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  };

  return { LogOut };
};

export default useLogOut;
