import { useRecoilState } from "recoil";
import { userInfoState } from "../../atoms/authAtom";
import { ChangeEvent, useState } from "react";
import {
  checkNickname,
  checkPassword,
  updateUserInfo,
} from "../../apis/authApis";
import styled from "styled-components";
import {
  AddInput,
  CompleteBtn,
  InfoContainer,
  InfoInputBox,
  InfoTitle,
  Title,
  UpdateContainer,
} from "../common/CommonStyledComponents";
import { useNavigate } from "react-router-dom";

const UpdateInfoPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [newNickname, setNewNickname] = useState<string>(userInfo.nickname);
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(true);
  const [newProfileMessage, setNewProfileMessage] = useState<string>(
    userInfo.profile
  );
  const [isMyNickname, setIsMyNickname] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const nicknameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
    setNicknameCheck(false);
    if (event.target.value === userInfo.nickname) {
      setIsMyNickname(true);
    } else {
      setIsMyNickname(false);
    }
  };

  const nicknameValidate = async () => {
    const checkResult = await checkNickname(newNickname);
    if (!checkResult) {
      alert("사용 가능한 닉네임입니다");
      setNicknameCheck(true);
    } else if (checkResult) {
      alert("중복된 닉네임입니다.");
      setNicknameCheck(false);
    } else {
      console.log("error");
    }
  };

  const profileMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProfileMessage(event.target.value);
  };

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const updateSubmitHandler = async () => {
    // 내 정보 수정 api 호출 및 atom 반영(api가 success 되면 atom 업데이트)
    if (newNickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    if (!isMyNickname && !nicknameCheck) {
      alert("닉네임 중복확인이 필요합니다");
      return;
    }

    if (userInfo.type !== "SOCIAL" && password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }

    // 한줄소개는 공백이어도 가능하게.

    const checkPasswordResult = await checkPassword(password);
    if (checkPasswordResult === true) {
      const updateResult = await updateUserInfo(newNickname, newProfileMessage);
      if (updateResult !== null) {
        setUserInfo((prev) => ({
          ...prev,
          nickname: updateResult.nickname,
          profile: updateResult.profile,
        }));
        alert("내 정보가 수정되었습니다");
        navigate("/mypage/profile");
      }
    } else {
      alert("비밀번호를 확인해주세요");
    }
  };

  return (
    <div>
      <Title>내 정보 수정</Title>
      <UpdateContainer>
        <InfoContainer>
          <InfoTitle>닉네임</InfoTitle>
          <InfoInputBox>
            <AddInput defaultValue={newNickname} onChange={nicknameHandler} />
          </InfoInputBox>
        </InfoContainer>
        {isMyNickname ? (
          <CheckBtnBox>
            <CheckBtn status="my">확인 완료</CheckBtn>
          </CheckBtnBox>
        ) : nicknameCheck ? (
          <CheckBtnBox>
            <CheckBtn status="true">확인 완료</CheckBtn>
          </CheckBtnBox>
        ) : (
          <CheckBtnBox>
            <CheckBtn status="false" onClick={nicknameValidate}>
              중복 확인
            </CheckBtn>
          </CheckBtnBox>
        )}

        <InfoContainer>
          <InfoTitle>한줄소개</InfoTitle>
          <InfoInputBox>
            <AddInput
              defaultValue={newProfileMessage}
              onChange={profileMessageHandler}
            />
          </InfoInputBox>
        </InfoContainer>
        {userInfo.type !== "SOCIAL" ? (
          <InfoContainer>
            <InfoTitle>비밀번호 확인</InfoTitle>
            <InfoInputBox>
              <AddInput type="password" onChange={passwordHandler} />
            </InfoInputBox>
          </InfoContainer>
        ) : null}

        <CompleteBtn onClick={updateSubmitHandler}>저장</CompleteBtn>
      </UpdateContainer>
    </div>
  );
};

export default UpdateInfoPage;

const CheckBtnBox = styled.div`
  // flex: 5;
  // display: flex;
  // justify-content: end;
`;

interface props {
  status: string;
}
const CheckBtn = styled.button<props>`
  background-color: ${({ status }) =>
    status === "true" ? "#bbd462" : status === "my" ? "#cecece" : "#ff6161"};
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: ${({ status }) => (status === "false" ? "pointer" : "null")};
  padding: 6px 18px;
  font-family: "LeeSeoyun";
  font-size: 1.2rem;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: ${({ status }) =>
      status === "false" ? "#e45757" : "null"};
  }

  &:active {
    transform: scale(1.05);
  }
`;
