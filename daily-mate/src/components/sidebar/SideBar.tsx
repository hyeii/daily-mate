import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { sideBarOpenState } from "../../atoms/sideBarAtom";
import {
  isLoginState,
  refreshTokenState,
  userImageURLState,
  userInfoState,
} from "../../atoms/authAtom";
import { logOut } from "../../apis/authApis";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useRecoilState(sideBarOpenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setImageURL = useSetRecoilState(userImageURLState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const navigate = useNavigate();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    const logOutResult = await logOut();
    if (logOutResult !== null) {
      setUserInfo({
        userId: -1,
        nickname: "",
        email: "",
        profile: "",
        type: "",
      });
      setIsLogin(false);
      setImageURL("");
      setRefreshToken("");
      // 인터셉터 초기화
      alert("로그아웃 완료");
      navigate("/");
    }
  };

  const moveDiary = () => {
    navigate("/diary/monthly/1");
  };
  const moveAccount = () => {
    navigate("/account");
  };
  const moveMyPage = () => {
    navigate("/mypage/profile");
  };

  const moveNotifications = () => {
    navigate("/notifications");
  };

  const moveSearch = () => {
    navigate("/search");
  };
  return (
    <SidebarContainer isopen={isOpen ? "open" : "close"}>
      사이드바
      <button onClick={handleOpen}>버튼</button>
      <div>{userInfo.nickname}님</div>
      <button onClick={moveNotifications}>알림</button>
      <IoSearch onClick={moveSearch} />
      <div onClick={moveDiary}>다이어리</div>
      <div onClick={moveAccount}>가계부</div>
      <div>할 일</div>
      <div onClick={moveMyPage}>마이페이지</div>
      <button onClick={handleLogOut}>로그아웃</button>
    </SidebarContainer>
  );
};

export default SideBar;

interface SidebarProps {
  isopen: string;
}

const SidebarContainer = styled.div<SidebarProps>`
  position: fixed;
  height: 100vh;
  left: ${({ isopen }) => (isopen === "open" ? "0" : "-300px")};
  width: 300px;
  background-color: #fbeffb;
  overflow-x: hidden;
  transition: left 0.3s ease;
`;
