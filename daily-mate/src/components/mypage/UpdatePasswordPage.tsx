import { ChangeEvent, useState } from "react";
import { updatePasswordInput } from "../../types/authType";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../apis/authApis";
import {
  AddInput,
  CompleteBtn,
  InfoContainer,
  InfoInputBox,
  InfoTitle,
  Title,
  UpdateContainer,
} from "../common/CommonStyledComponents";
import styled from "styled-components";

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
      <Title>비밀번호 변경</Title>
      <UpdateContainer>
        <InfoContainer>
          <InfoTitle>기존 비밀번호</InfoTitle>
          <InfoInputBox>
            <AddInput type="password" onChange={existPasswordHandler} />
          </InfoInputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>새 비밀번호</InfoTitle>
          <InfoInputBox>
            <AddInput type="password" onChange={newPasswordHandler} />
          </InfoInputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>새 비밀번호 확인</InfoTitle>
          <InfoInputBox>
            <AddInput type="password" onChange={newPasswordCheckHandler} />
            {isEqual ? (
              <IsEqualText status="equal">비밀번호가 일치합니다</IsEqualText>
            ) : !beforeEnter ? (
              <IsEqualText status="diff">
                비밀번호가 일치하지 않습니다
              </IsEqualText>
            ) : null}
          </InfoInputBox>
        </InfoContainer>

        <CompleteBtn onClick={updatePasswordHandler}>확인</CompleteBtn>
      </UpdateContainer>
    </div>
  );
};

export default UpdatePasswordPage;

interface isEqual {
  status: string;
}

const IsEqualText = styled.span<isEqual>`
  margin: 0 2rem;
  font-size: 1.1rem;
  text-align: center;
  color: ${({ status }) => (status === "equal" ? "green" : "red")};
`;
