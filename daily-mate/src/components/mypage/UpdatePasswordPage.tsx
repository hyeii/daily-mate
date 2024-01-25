import { ChangeEvent, useState } from "react";
import { updatePasswordInput } from "../../types/authType";

const UpdatePasswordPage = () => {
  const [updatePassword, setUpdatePassword] = useState<updatePasswordInput>({
    existPassword: "",
    newPassword: "",
    newPasswordCheck: "",
  });

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
      </div>
      <button onClick={updatePasswordHandler}>확인</button>
    </div>
  );
};

export default UpdatePasswordPage;
