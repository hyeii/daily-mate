import axios from "axios";
import { useEffect } from "react";
import { userInfo, userResponse } from "../../types/authType";
import { useSetRecoilState } from "recoil";
import {
  isLoginState,
  userImageURLState,
  userInfoState,
} from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";

const GoogleRedirectPage = () => {
  const token = new URL(window.location.href).searchParams.get("accessToken");
  const setIsLogged = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setUserImage = useSetRecoilState(userImageURLState);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(token);

    const login = async () => {
      const socialAPI = axios.create({
        baseURL: process.env.REACT_APP_URL,
        headers: {
          Authorization: token,
        },
      });
      try {
        const res = await socialAPI.get<userResponse>(
          "/oauth/google/login-info"
        );

        console.log("구글로그인 데이터 : ", res.data);
        const logInUserInfo: userInfo = {
          userId: res.data.userId,
          nickname: res.data.nickName,
          email: res.data.email,
          profile: res.data.profile,
          type: res.data.type,
        };
        window.localStorage.setItem("accessToken", res.data.accessToken);
        window.localStorage.setItem("refreshToken", res.data.refreshToken);
        setUserInfo(logInUserInfo);
        setUserImage(res.data.image);

        setIsLogged(true);
        alert(`${res.data.nickName}님 어서오세요!`);
        navigate("/account");
      } catch (error) {
        console.error("구글 로그인 에러 : ", error);
      }
    };

    login();
  }, []);
  return <div>구글로그인중</div>;
};

export default GoogleRedirectPage;
