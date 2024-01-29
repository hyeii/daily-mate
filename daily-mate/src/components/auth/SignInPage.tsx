import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isLoginState } from "../../atoms/authAtom";
import { useNavigate } from "react-router-dom";
import { userResponse } from "../../types/authType";

const SignInPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const setIsLogged = useSetRecoilState(isLoginState);

  const navigate = useNavigate();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }

    if (inputPassword === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    try {
      const res: AxiosResponse<userResponse> = await axios.post(
        "/api/user/login",
        {
          email: inputEmail,
          password: inputPassword,
        }
      );
      const result = res.data;
      console.log(result);
      // TODO : post요청 성공 시 accessToken 및 유저 정보 저장

      setIsLogged(true);
      navigate("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("입력 정보를 확인해주세요");
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
