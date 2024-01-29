import { ChangeEvent, useState } from "react";

const SignInPage = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit = () => {};
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
