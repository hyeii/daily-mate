import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AccountPage,
  DiaryDailyPage,
  DiaryMonthlyPage,
  DiaryWritePage,
  FriendsListPage,
  GoogleRedirectPage,
  KakaoRedirectPage,
  MainPage,
  NotificationPage,
  ProfilePage,
  SearchPage,
  SideBar,
  SignInPage,
  SignUpPage,
  TodoPage,
  UpdateInfoPage,
  UpdatePasswordPage,
} from "./components/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { sideBarOpenState } from "./atoms/sideBarAtom";
import { RxDoubleArrowRight } from "react-icons/rx";
import styled from "styled-components";
import { isLoginState } from "./atoms/authAtom";

function App() {
  const [isOpen, setIsOpen] = useRecoilState(sideBarOpenState);
  const isLogin = useRecoilValue(isLoginState);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Wrapper>
      {isLogin ? <SideBar /> : null}
      <MainContainer isopen={isOpen ? "open" : "close"}>
        <MainBox isopen={isOpen ? "open" : "close"}>
          {isLogin ? (
            <OpenBtn
              isopen={isOpen ? "open" : "close"}
              onClick={handleOpen}
              size={30}
            />
          ) : null}
          <Routes>
            {/* 라우팅 추후 수정 예정 */}
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mypage/profile" element={<ProfilePage />} />
            <Route path="/mypage/update" element={<UpdateInfoPage />} />
            <Route path="/mypage/password" element={<UpdatePasswordPage />} />
            <Route path="/friends/list" element={<FriendsListPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route
              path="/diary/monthly/:userId"
              element={<DiaryMonthlyPage />}
            />
            <Route path="/diary/daily/:diaryId" element={<DiaryDailyPage />} />
            <Route path="/diary/daily/write" element={<DiaryWritePage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/todo" element={<TodoPage />}></Route>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/oauth/kakao" element={<KakaoRedirectPage />} />
            <Route
              path="/oauth/google/success"
              element={<GoogleRedirectPage />}
            />
          </Routes>
        </MainBox>
      </MainContainer>
    </Wrapper>
  );
}

export default App;

interface SidebarProps {
  isopen: string;
}

const MainContainer = styled.div<SidebarProps>`
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  width: ${({ isopen }) =>
    isopen === "open" ? "calc(100vw - 300px)" : "100vw"};
  left: ${({ isopen }) => (isopen === "open" ? "300px" : "0px")};
  transition: width 0.3s ease, left 0.3s ease;
`;

const MainBox = styled.div<SidebarProps>`
  width: auto;

  @media screen and (min-width: 1300px) {
    margin: ${({ isopen }) => (isopen === "open" ? "3rem 7rem" : "3rem 15rem")};
  }

  @media screen and (min-width: 992px) and (max-width: 1299px) {
    margin: ${({ isopen }) => (isopen === "open" ? "3rem 5rem" : "3rem 7rem")};
  }

  @media screen and (max-width: 991px) {
    margin: ${({ isopen }) => (isopen === "open" ? "3rem 3rem" : "3rem 5rem")};
  }
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  background-color: #fcf2f2;
`;

const OpenBtn = styled(RxDoubleArrowRight)<SidebarProps>`
  position: fixed;
  color: #5e5e5e;
  top: 50%;
  left: ${({ isopen }) => (isopen === "open" ? "303px" : "3px")};
  transform: ${({ isopen }) => (isopen === "open" ? "scaleX(-1)" : "none")};
  transition: width 0.3s ease, left 0.3s ease;
  cursor: pointer;
  &: hover {
    color: #919191;
  }
`;
