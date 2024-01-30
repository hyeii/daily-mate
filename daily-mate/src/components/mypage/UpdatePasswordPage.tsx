import { ChangeEvent, useState } from "react";
import { updatePasswordInput } from "../../types/authType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const UpdatePasswordPage = () => {
  const [updatePassword, setUpdatePassword] = useState<updatePasswordInput>({
    existPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });
  const navigate = useNavigate();

  const isEqual =
    updatePassword.newPassword !== "" &&
    updatePassword.newPasswordCheck !== "" &&
    updatePassword.newPassword === updatePassword.newPasswordCheck;

  const beforeEnter =
    updatePassword.existPassword === "" ||
    updatePassword.newPassword === "" ||
    updatePassword.newPasswordCheck === "";

  const existPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword({
      ...updatePassword,
      existPassword: event.target.value,
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
      try {
        const res: AxiosResponse<{ message: string }> = await axios.patch(
          "/api/user/password",
          {
            password: updatePassword.existPassword,
            newPassword: updatePassword.newPassword,
            newPasswordCheck: updatePassword.newPasswordCheck,
          }
        );
        const result = res.data;
        console.log(result);
        alert("비밀번호가 변경되었습니다");
        navigate("/mypage/profile");
      } catch (error) {
        console.error("비밀번호 변경 오류 : ", error);
        alert("비밀번호를 다시 확인해주세요");
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
