import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail, checkNickname, signUp } from "../../apis/authApis";
import { signUpRequest, userResponse } from "../../types/authType";
import styled from "styled-components";
import axios from "axios";

const SignUpPage = () => {
  const [inputNickname, setInputNickname] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPasswordCheck, setInputPasswordCheck] = useState<string>("");

  const [validateNickname, setValidateNickname] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
  const [regPasswordMessage, setRegPasswordMessage] = useState<string>(
    "8자 이상, 영문자, 숫자, 특수문자를 포함해주세요"
  );
  const [regPasswordValue, setRegPasswordValue] = useState<boolean>(false);
  const [regEmailValue, setRegEmailValue] = useState<boolean>(false);
  const [regEmailMessage, setRegEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setValidateNickname(false);
    setInputNickname(event.target.value);
  };

  const handleValidateNickname = async () => {
    // 닉네임 중복확인 호출
    if (inputNickname === "") {
      alert("닉네임을 입력해주세요");
    } else {
      const checkResult = await checkNickname(inputNickname);
      if (!checkResult) {
        alert("사용 가능한 닉네임입니다");
        setValidateNickname(true);
      } else if (checkResult) {
        alert("중복된 닉네임입니다.");
        setValidateNickname(false);
      } else {
        console.log("error");
      }
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setValidateEmail(false);
    setInputEmail(event.target.value);
  };

  const handleValidateEmail = async () => {
    // 이메일 중복확인 호출
    if (!regEmailValue) {
      alert("이메일을 확인해주세요");
      return;
    }

    if (inputEmail === "") {
      alert("이메일을 입력해주세요");
    } else {
      const checkResult = await checkEmail(inputEmail);
      if (!checkResult) {
        alert("사용 가능한 이메일입니다");
        setValidateEmail(true);
      } else if (checkResult) {
        alert("중복된 이메일입니다.");
        setValidateEmail(false);
      } else {
        console.log("error");
      }
    }
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const handlePasswordCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPasswordCheck(event.target.value);
  };

  useEffect(() => {
    // 비밀번호 정규식. 최소 하나 이상의 영문자(대소문자 구분 X), 최소 하나 이상의 숫자 및 특수문자, 8자 이상 16자 이하
    const regPassword =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&#/])[A-Za-z\d@$!%*?&#/]{8,16}$/;
    if (regPassword.test(inputPassword)) {
      setRegPasswordMessage("사용 가능한 비밀번호입니다.");
      setRegPasswordValue(true);
    } else {
      setRegPasswordMessage(
        "8자 ~ 16자, 영문자, 숫자, 특수문자를 포함해주세요"
      );
      setRegPasswordValue(false);
    }

    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (regEmail.test(inputEmail)) {
      setRegEmailMessage("");
      setRegEmailValue(true);
    } else {
      setRegEmailMessage("올바른 이메일을 입력해주세요");
      setRegEmailValue(false);
    }

    if (inputPassword === "" || inputPasswordCheck === "") {
      setPasswordMessage("");
      setValidatePassword(false);
    } else if (inputPassword === inputPasswordCheck) {
      setPasswordMessage("비밀번호가 일치합니다");
      setValidatePassword(true);
    } else {
      setPasswordMessage("비밀번호가 일치하지 않습니다");
      setValidatePassword(false);
    }
  }, [inputEmail, inputPassword, inputPasswordCheck, regPasswordMessage]);

  const submitSignUp = async () => {
    if (inputNickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (inputEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }

    if (!validateNickname) {
      alert("닉네임 중복확인이 필요합니다");
      return;
    }

    if (!validateEmail) {
      alert("이메일 중복확인이 필요합니다");
      return;
    }

    if (!validatePassword) {
      alert("비밀번호 확인이 필요합니다");
      return;
    }

    // 회원가입 api 호출
    const signUpBody: signUpRequest = {
      email: inputEmail,
      password: inputPassword,
      nickname: inputNickname,
    };

    console.log(signUpBody);
    const signUpResult = await signUp(signUpBody);
    if (signUpResult) {
      alert("회원가입이 완료되었습니다. 로그인 후 이용해주세요");
      navigate("/signin");
    } else {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleKakao = () => {
    const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    window.location.href = kakaoURL;
  };

  const handleGoogle = async () => {
    const googleURL = "http://localhost:8080/oauth2/authorization/google";
    // const googleURL: string = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
    // window.location.href = googleURL;

    // try {
    //   const res = await axios.get<userResponse>(
    //     "http://localhost:8080/oauth/google"
    //   );
    //   console.log(res.data);

    //   navigate("/");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      <h3>회원가입</h3>
      <Container>
        <InputDiv>
          <div>닉네임</div>
          <DataInput setwidth="short" type="text" onChange={handleNickname} />
          <CheckBtn onClick={handleValidateNickname}>중복확인</CheckBtn>{" "}
          {validateNickname ? (
            <CheckText check="true">사용 가능한 닉네임입니다</CheckText>
          ) : (
            <Hidden>숨김</Hidden>
          )}
        </InputDiv>
        <InputDiv>
          <div>이메일</div>
          <DataInput setwidth="short" type="email" onChange={handleEmail} />
          <CheckBtn onClick={handleValidateEmail}>중복확인</CheckBtn>
          {inputEmail !== "" && !regEmailValue ? (
            <CheckText check={regEmailValue ? "true" : "false"}>
              {regEmailMessage}
            </CheckText>
          ) : validateEmail ? (
            <CheckText check="true">사용 가능한 이메일입니다</CheckText>
          ) : (
            <Hidden>숨김</Hidden>
          )}{" "}
        </InputDiv>
        <InputDiv>
          <div>비밀번호</div>
          <DataInput
            setwidth="long"
            type="password"
            onChange={handlePassword}
          />
          <CheckText check={regPasswordValue ? "true" : "false"}>
            {regPasswordMessage}
          </CheckText>
        </InputDiv>
        <InputDiv>
          <div>비밀번호 확인</div>
          <DataInput
            setwidth="long"
            type="password"
            onChange={handlePasswordCheck}
          />
          {passwordMessage === "" ? (
            <Hidden>숨김</Hidden>
          ) : (
            <CheckText check={validatePassword ? "true" : "false"}>
              {passwordMessage}
            </CheckText>
          )}
        </InputDiv>
        <div>
          <SignUpBtn onClick={submitSignUp}>회원가입</SignUpBtn>
        </div>
        <div>
          <span>이미 회원이신가요?</span>
          <span>로그인</span>
        </div>
        <button onClick={handleKakao}>카카오</button>
        <button onClick={handleGoogle}>구글</button>
      </Container>
    </div>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const InputDiv = styled.div`
  margin: 10px 0;
  flex-grow: 1;
`;

interface inputprop {
  setwidth: string;
}

const DataInput = styled.input<inputprop>`
  // width: 250px;
  width: ${({ setwidth }) => (setwidth === "short" ? "250px" : "340px")};
  height: 35px;
  border: 1.5px solid #cccccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    border-color: #afafaf;
    outline: none;
  }
`;

const CheckBtn = styled.button`
  font-family: "S-CoreDream-3Light";
  width: 80px;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #f6dee2;

  margin-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fbe4e6;
  }

  &:active {
    transform: scale(1.05);
  }
`;

const Hidden = styled.div`
  visibility: hidden;
`;

interface checkvalue {
  check: string;
}

const CheckText = styled.div<checkvalue>`
  color: ${({ check }) => (check === "true" ? "green" : "red")};
`;

const SignUpBtn = styled.button`
  font-family: "S-CoreDream-3Light";
  width: 340px;
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s, background-color 0.3s;
  background-color: #f6dee2;

  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fbe4e6;
  }

  &:active {
    transform: scale(1.05);
  }
`;
