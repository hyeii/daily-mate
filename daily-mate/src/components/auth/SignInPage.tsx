import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  isLoginState,
  userImageURLState,
  userInfoState,
} from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../types/authType";
import { useSignIn } from "../../apis/authApis";

const SignInPage = () => {
  // TODO : api 요청 분리

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const setIsLogged = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setUserImage = useSetRecoilState(userImageURLState);

  const navigate = useNavigate();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };
  const signIn = useSignIn();

  const handleSubmit = async () => {
    if (inputEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }

    if (inputPassword === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    const signInResult = await signIn(inputEmail, inputPassword);
    if (signInResult !== null) {
      console.log("로그인 유저 정보 : ", signInResult);
      const logInUserInfo: userInfo = {
        userId: signInResult.userId,
        nickname: signInResult.nickName,
        email: signInResult.email,
        profile: signInResult.profile,
        type: signInResult.type,
      };

      setUserInfo(logInUserInfo);
      setUserImage(signInResult.image);
      // setRefreshToken(signInResult.refreshToken);

      setIsLogged(true);
      navigate("/");
    } else {
      alert("로그인 정보를 확인해주세요");
    }
  };
  return (
    <div>
      <h3>로그인 페이지</h3>
      <div>
        <div>이메일</div>
        <input
          type="text"
          value={inputEmail}
          onChange={handleEmail}
          placeholder="이메일을 입력해주세요"
        />
        <div>비밀번호</div>
        <input
          type="password"
          value={inputPassword}
          onChange={handlePassword}
          placeholder="비밀번호를 입력해주세요"
        />
        <button onClick={handleSubmit}>로그인</button>
        <div>카카오</div>
        <div>구글</div>
      </div>
    </div>
  );
};

export default SignInPage;
