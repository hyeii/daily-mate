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
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { RxDoubleArrowLeft } from "react-icons/rx";
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
    <SidebarWrapper isopen={isOpen ? "open" : "close"}>
      <SidebarContainer>
        <SidebarBtnBox>
          <SidebarBtn onClick={handleOpen} />
        </SidebarBtnBox>
        <UserProfileBox>
          <ImageBox
            src={process.env.PUBLIC_URL + "/defaultImg.png"}
            alt="default"
          />
          <UserProfileRight>
            <NotificationBtn onClick={moveNotifications} />
            <div>{userInfo.nickname}님</div>
          </UserProfileRight>
        </UserProfileBox>
        <div style={{ height: "70px" }}></div>
        <SidebarSearchIcon onClick={moveSearch} />
        <SidebarItems onClick={moveDiary}>다이어리</SidebarItems>
        <SidebarItems onClick={moveAccount}>가계부</SidebarItems>
        <SidebarItems>할 일</SidebarItems>
        <SidebarItems onClick={moveMyPage}>마이페이지</SidebarItems>
        <SidebarItems onClick={handleLogOut}>로그아웃</SidebarItems>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default SideBar;

interface SidebarProps {
  isopen: string;
}

const SidebarWrapper = styled.div<SidebarProps>`
  position: fixed;
  height: 100vh;
  left: ${({ isopen }) => (isopen === "open" ? "0" : "-300px")};
  width: 300px;
  background-color: #fbeffb;
  overflow-x: hidden;
  transition: left 0.3s ease;
  font-size: 1.15rem;
`;

const SidebarContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
`;

const SidebarBtnBox = styled.div`
  display: flex;
  justify-content: end;
`;
const SidebarBtn = styled(RxDoubleArrowLeft)`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  // color: #aaaaaa;
  cursor: pointer;
  &: hover {
    transform: scale(1.1);
  }
`;

const ImageBox = styled.img`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  object-fit: cover;
`;

const UserProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserProfileRight = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
`;

const NotificationBtn = styled(IoNotificationsOutline)`
  cursor: pointer;
  transition: transform 0.1s;
  font-size: 1.2rem;
  &: hover {
    transform: scale(1.1);
  }
`;

const SidebarItems = styled.div`
  margin: 0.7rem 0;
  cursor: pointer;
  &: hover {
    font-weight: bold;
  }
`;

const SidebarSearchIcon = styled(IoSearch)`
  margin: 0.5rem 0;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.1s;
  &: hover {
    transform: scale(1.1);
  }
`;
