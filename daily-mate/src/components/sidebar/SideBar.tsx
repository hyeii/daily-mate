import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { sideBarOpenState } from "../../atoms/sideBarAtom";
import { userImageURLState, userInfoState } from "../../atoms/authAtom";
import { logOut } from "../../apis/authApis";
import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { accountTabState, selectedDateState } from "../../atoms/accountAtom";
import { format } from "date-fns";
import useLogOut from "../../hooks/useLogOut";

const SideBar = () => {
  const isOpen = useRecoilValue(sideBarOpenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const userImageURL = useRecoilValue(userImageURLState);
  const setSelectedDate = useSetRecoilState(selectedDateState);
  const setAccountTab = useSetRecoilState(accountTabState);
  const navigate = useNavigate();
  const { LogOut } = useLogOut();

  const handleLogOut = async () => {
    console.log("너나오면안돼");
    const logOutResult = await logOut();
    if (logOutResult !== null) {
      LogOut();
      alert("로그아웃 완료");
      navigate("/");
    }
  };

  const moveDiary = () => {
    navigate(`/diary/monthly/${userInfo.userId}`);
  };
  const moveAccount = () => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
    setAccountTab("calendar");
    navigate("/account");
  };
  const moveMyPage = () => {
    navigate("/mypage/profile");
  };
  const myTodo = () => {
    navigate("/todo");
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
        <UserProfileBox>
          <ImageBox
            src={userImageURL ?? process.env.PUBLIC_URL + "/defaultImg.png"}
            alt="userImage"
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
        <SidebarItems onClick={myTodo}>할 일</SidebarItems>
        <SidebarItems onClick={moveMyPage}>마이페이지</SidebarItems>
        {userInfo.providerId === "kakao" ? (
          <a
            href={process.env.REACT_APP_URL + "/oauth/kakao/logout"}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <SidebarItems>로그아웃</SidebarItems>
          </a>
        ) : (
          <SidebarItems onClick={handleLogOut}>로그아웃</SidebarItems>
        )}
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
  background-color: #f5d5d5;
  overflow-x: hidden;
  transition: left 0.3s ease;
  font-size: 1.15rem;
`;

const SidebarContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
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
