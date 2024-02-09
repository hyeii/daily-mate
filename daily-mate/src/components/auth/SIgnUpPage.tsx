import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail, checkNickname, signUp } from "../../apis/authApis";
import { signUpRequest } from "../../types/authType";

const SignUpPage = () => {
  const [inputNickname, setInputNickname] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPasswordCheck, setInputPasswordCheck] = useState<string>("");

  const [validateNickname, setValidateNickname] = useState<boolean>(false);
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [validatePassword, setValidatePassword] = useState<boolean>(false);
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
      if (checkResult) {
        alert("사용 가능한 닉네임입니다");
        setValidateNickname(true);
      } else {
        alert("중복된 닉네임입니다.");
        setValidateNickname(false);
      }
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setValidateEmail(false);
    setInputEmail(event.target.value);
  };

  const handleValidateEmail = async () => {
    // 이메일 중복확인 호출
    if (inputEmail === "") {
      alert("이메일을 입력해주세요");
    } else {
      const checkResult = await checkEmail(inputEmail);
      if (checkResult) {
        alert("사용 가능한 이메일입니다");
        setValidateEmail(true);
      } else {
        alert("중복된 이메일입니다.");
        setValidateEmail(false);
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
  }, [inputPassword, inputPasswordCheck]);

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

    const signUpResult = await signUp(signUpBody);
    if (signUpResult) {
      navigate("/signin");
    } else {
      //  새로고침
    }
  };

  return (
    <div>
      <h3>회원가입</h3>
      <div>
        <div>닉네임</div>
        <input type="text" onChange={handleNickname} />
        <button onClick={handleValidateNickname}>중복확인</button>
        {validateNickname ? <div>사용 가능한 닉네임입니다</div> : <div></div>}
        <div>이메일</div>
        <input type="email" onChange={handleEmail} />
        <button onClick={handleValidateEmail}>중복확인</button>
        {validateEmail ? <div>사용 가능한 이메일입니다</div> : <div></div>}
        <div>비밀번호</div>
        <input type="password" onChange={handlePassword} />
        <div>비밀번호 확인</div>
        <input type="password" onChange={handlePasswordCheck} />
        <div>{passwordMessage}</div>
        <div>
          <button onClick={submitSignUp}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
