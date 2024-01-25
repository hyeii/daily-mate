import { useNavigate } from "react-router-dom";
import { userInfoState } from "../../atoms/authAtom";
import ProfileImage from "./ProfileImage";
import { useRecoilState, useRecoilValue } from "recoil";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);

  const updateInfoHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/mypage/update");
  };

  const updatePasswordHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate("/mypage/password");
  };

  const friendsHandler = () => {
    navigate("/friends/list");
  };

  return (
    <div>
      <h2>내 정보</h2>
      <ProfileImage />
      <div>
        <div>
          <span>{userInfo.nickname}</span>
          <span onClick={friendsHandler}>{userInfo.friendsCount}명의 친구</span>
        </div>
        <div>한줄소개</div>
        <div>
          <span>E-MAIL</span>
          <span>{userInfo.email}</span>
        </div>
        <div>
          <span>소셜 로그인</span>
          <span>{userInfo.loginType}</span>
        </div>
      </div>
      <div onClick={updateInfoHandler}>회원 정보 수정</div>
      <div onClick={updatePasswordHandler}>비밀번호 변경</div>
      <div>회원 탈퇴</div>
    </div>
  );
};

export default ProfilePage;
