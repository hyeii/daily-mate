import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { isLoginState } from "../../atoms/authAtom";

const SignInPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLogged, setIsLogged] = useRecoilState(isLoginState);

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
      const res: AxiosResponse<{ message: string }> = await axios.post(
        "/api/user/login",
        {
          email: inputEmail,
          password: inputPassword,
        }
      );
      const result = res.data.message;

      console.log(result);
      // TODO : post요청 성공 시 accesstoken 받아서 내 정보 조회 재요청 => atom에 저장, isLogin true처리
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
