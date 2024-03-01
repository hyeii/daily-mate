import { useNavigate } from "react-router-dom";
import { userInfoState } from "../../atoms/authAtom";
import ProfileImage from "./ProfileImage";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deleteUser } from "../../apis/authApis";
import useLogOut from "../../hooks/useLogOut";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const { LogOut } = useLogOut();

  const updateInfoHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate("/mypage/update");
  };

  const updatePasswordHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate("/mypage/password");
  };

  const friendsHandler = () => {
    navigate("/friends/list");
  };

  const deleteUserHandler = async () => {
    if (
      window.confirm("데일리메이트에서 탈퇴하시겠습니까?") &&
      window.confirm("회원 탈퇴를 진행합니다")
    ) {
      const deleteResponse = await deleteUser();
      if (deleteResponse) {
        LogOut();
        alert("탈퇴가 완료되었습니다.");
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Title>내 정보</Title>
      <ProfileContainer>
        <ImageContainer>
          <ProfileImage />
        </ImageContainer>
        <InfoContainer>
          <NickNameFriendBox>
            <NickNameBox>{userInfo.nickname}</NickNameBox>
            <span onClick={friendsHandler}>명의 친구</span>
          </NickNameFriendBox>
          <ProfileTextBox>{userInfo.profile}</ProfileTextBox>
          <ProfileBottomContainer>
            <ProfileMenuBox>
              <Text>E-MAIL</Text>
              <Text>소셜 로그인</Text>
            </ProfileMenuBox>
            <ProfileContent>
              <Text>{userInfo.email}</Text>
              <Text>{userInfo.type}</Text>
            </ProfileContent>
          </ProfileBottomContainer>
          <div onClick={updateInfoHandler}>회원 정보 수정</div>
          <div onClick={updatePasswordHandler}>비밀번호 변경</div>
          <div onClick={deleteUserHandler}>회원 탈퇴</div>
        </InfoContainer>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePage;

const Title = styled.h3`
  margin-right: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Text = styled.div`
  margin: 1rem 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  font-size: 1.05rem;
  margin: 4rem 0;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 2;
`;

const NickNameFriendBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NickNameBox = styled.span`
  font-weight: bold;
  font-size: 1.2em;
`;

const ProfileTextBox = styled.div`
  font-size: 0.9em;
  margin: 1rem 0;
  background-color: #fde6e6;
  padding: 1.2rem;
  border-radius: 10px;
`;

const ProfileBottomContainer = styled.div`
  display: flex;
`;
const ProfileMenuBox = styled.div`
  flex: 1;
  font-weight: bold;
`;
const ProfileContent = styled.div`
  flex: 2;
`;
