import { ChangeEvent, useState } from "react";
import { updatePasswordInput } from "../../types/authType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../apis/authApis";

const UpdatePasswordPage = () => {
  const [updatePassword, setUpdatePassword] = useState<updatePasswordInput>({
    password: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  const navigate = useNavigate();

  const isEqual =
    updatePassword.newPassword !== "" &&
    updatePassword.newPasswordCheck !== "" &&
    updatePassword.newPassword === updatePassword.newPasswordCheck;

  const beforeEnter =
    updatePassword.password === "" ||
    updatePassword.newPassword === "" ||
    updatePassword.newPasswordCheck === "";

  const existPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword({
      ...updatePassword,
      password: event.target.value,
    });
  };

  const newPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword({
      ...updatePassword,
      newPassword: event.target.value,
    });
  };

  const newPasswordCheckHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword({
      ...updatePassword,
      newPasswordCheck: event.target.value,
    });
  };

  const updatePasswordHandler = async () => {
    // console.log(updatePassword);
    if (isEqual && !beforeEnter) {
      // 비밀번호 변경
      const updateResult = await updateUserPassword(updatePassword);
      if (updateResult !== null) {
        navigate("/mypage/profile");
      }
    } else {
      alert("올바르게 입력해주세요.");
      return;
    }
  };

  return (
    <div>
      <h2>비밀번호 변경</h2>
      <div>
        <div>기존 비밀번호</div>
        <input type="password" onChange={existPasswordHandler} />
        <div>새 비밀번호</div>
        <input type="password" onChange={newPasswordHandler} />
        <div>새 비밀번호 확인</div>
        <input type="password" onChange={newPasswordCheckHandler} />
        {isEqual ? (
          <div>비밀번호가 일치합니다</div>
        ) : !beforeEnter ? (
          <div>비밀번호가 일치하지 않습니다</div>
        ) : null}
      </div>
      <button onClick={updatePasswordHandler}>확인</button>
    </div>
  );
};

export default UpdatePasswordPage;
