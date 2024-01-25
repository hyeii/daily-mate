import { ChangeEvent, useState } from "react";
import { updatePasswordInput } from "../../types/authType";

const UpdatePasswordPage = () => {
  const [updatePassword, setUpdatePassword] = useState<updatePasswordInput>({
    existPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

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

  const updatePasswordHandler = () => {
    // console.log(updatePassword);
    if (isEqual && !beforeEnter) {
      // 비밀번호 변경 가능
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
        <input onChange={existPasswordHandler} />
        <div>새 비밀번호</div>
        <input onChange={newPasswordHandler} />
        <div>새 비밀번호 확인</div>
        <input onChange={newPasswordCheckHandler} />
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
