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
import styled from "styled-components";
import {
  Container,
  SignBtn,
  SignWrapper,
} from "../common/CommonStyledComponents";

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
      alert(`${signInResult.nickName}님 어서오세요!`);
      navigate("/diary");
    } else {
      alert("로그인 정보를 확인해주세요");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  return (
    <SignWrapper>
      <h3>로그인</h3>
      <Container>
        <InputDiv>
          <div>이메일</div>
          <InputBox>
            <DataInput
              type="text"
              value={inputEmail}
              onChange={handleEmail}
              placeholder="이메일을 입력해주세요"
            />
          </InputBox>
        </InputDiv>
        <InputDiv>
          <div>비밀번호</div>
          <InputBox>
            <DataInput
              type="password"
              value={inputPassword}
              onChange={handlePassword}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputBox>
        </InputDiv>
        <SignBtn onClick={handleSubmit}>로그인</SignBtn>
        <span>아직 회원이 아니신가요?</span>
        <MoveSignBtn onClick={handleSignUp}>이메일로 가입하기</MoveSignBtn>
        <SocialLoginBox>
          <div>
            <SocialLogin
              src={process.env.PUBLIC_URL + "/kakao_login_large_narrow.png"}
              alt="kakaoLogin"
            />
          </div>
          <div>
            <SocialLogin
              src={process.env.PUBLIC_URL + "/web_light_sq_SI@4x.png"}
              alt="googleLogin"
            />
          </div>
        </SocialLoginBox>
      </Container>
    </SignWrapper>
  );
};

export default SignInPage;

const SocialLoginBox = styled.div`
  display: flex;
  height: 35px;
  margin: 10px 0;
  justify-content: space-between;
`;

const SocialLogin = styled.img`
  height: 35px;
  width: 148px;
  object-fit: fill;
`;

const InputDiv = styled.div`
  margin: 10px 0;
`;

const InputBox = styled.div`
  display: flex;
`;

const DataInput = styled.input`
  flex: 1;
  height: 35px;
  border: 1.5px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #afafaf;
    outline: none;
  }
`;

const MoveSignBtn = styled.div`
  width: auto;
  height: 35px;
  border: 1.5px solid #cccccc;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #ffffff;

  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  &:active {
    transform: scale(1.05);
  }
`;
