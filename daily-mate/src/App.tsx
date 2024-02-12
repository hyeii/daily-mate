import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  AccountPage,
  DiaryDailyPage,
  DiaryMonthlyPage,
  DiaryWritePage,
  FriendsListPage,
  MainPage,
  NotificationPage,
  ProfilePage,
  SearchPage,
  SideBar,
  SignInPage,
  SignUpPage,
  UpdateInfoPage,
  UpdatePasswordPage,
} from "./components/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { sideBarOpenState } from "./atoms/sideBarAtom";
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
      <SideBar />
      <MainContainer isopen={isOpen ? "open" : "close"}>
        {isLogin ? <button onClick={handleOpen}>버튼</button> : null}
        <button onClick={handleOpen}>버튼</button>
        <Routes>
          {/* 라우팅 추후 수정 예정 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage/profile" element={<ProfilePage />} />
          <Route path="/mypage/update" element={<UpdateInfoPage />} />
          <Route path="/mypage/password" element={<UpdatePasswordPage />} />
          <Route path="/friends/list" element={<FriendsListPage />} />
          <Route path="/friends/search" element={<SearchPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/diary/monthly/:id" element={<DiaryMonthlyPage />} />
          <Route path="/diary/daily/:id/:date" element={<DiaryDailyPage />} />
          <Route path="/diary/daily/write" element={<DiaryWritePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </MainContainer>
    </Wrapper>
  );
}

export default App;

interface SidebarProps {
  isopen: string;
}

const MainContainer = styled.div<SidebarProps>`
  margin: 2rem 5rem;
  position: fixed;
  width: ${({ isopen }) => (isopen === "open" ? "calc(100% - 300px)" : "100%")};
  left: ${({ isopen }) => (isopen === "open" ? "300px" : "0px")};
  transition: width 0.3s ease, left 0.3s ease;
`;

const Wrapper = styled.div``;
