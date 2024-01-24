import ProfileImage from "./ProfileImage";
import { atom, useRecoilState } from "recoil";

const nicknameState = atom({
  key: "nickname",
  default: "감자",
});

const friendsCountState = atom({
  key: "friendsCount",
  default: 0,
});

const ProfilePage = () => {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [friendsCount, setFriendsCount] = useRecoilState(friendsCountState);

  return (
    <div>
      <h2>내 정보</h2>
      <ProfileImage />
      <div>
        <div>{nickname}</div>
        <div>{friendsCount}명의 친구</div>
        <div>한줄소개</div>
        <div>E-MAIL</div>
        <div>이메일 정보</div>
        <div>소셜 로그인</div>
        <div>까까오</div>
      </div>
      <div>회원 정보 수정</div>
      <div>비밀번호 수정</div>
      <div>회원 탈퇴</div>
    </div>
  );
};

export default ProfilePage;
