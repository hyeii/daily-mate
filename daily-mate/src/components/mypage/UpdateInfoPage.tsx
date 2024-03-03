import { useRecoilState } from "recoil";
import { userInfoState } from "../../atoms/authAtom";
import { ChangeEvent, useState } from "react";
import { updateUserInfo } from "../../apis/authApis";
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
  const [newProfileMessage, setNewProfileMessage] = useState<string>(
    userInfo.profile
  );

  const nicknameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const profileMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProfileMessage(event.target.value);
  };

  const updateSubmitHandler = async () => {
    // 내 정보 수정 api 호출 및 atom 반영(api가 success 되면 atom 업데이트)
    if (newNickname === "") {
      alert("닉네임을 입력해주세요");
      return;
    }

    // 한줄소개는 공백이어도 가능하게.
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
        <InfoContainer>
          <InfoTitle>한줄소개</InfoTitle>
          <InfoInputBox>
            <AddInput
              defaultValue={newProfileMessage}
              onChange={profileMessageHandler}
            />
          </InfoInputBox>
        </InfoContainer>
        <CompleteBtn onClick={updateSubmitHandler}>저장</CompleteBtn>
      </UpdateContainer>
    </div>
  );
};

export default UpdateInfoPage;
