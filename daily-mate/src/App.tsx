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
  ProfilePage,
  SearchPage,
  SignInPage,
  SignUpPage,
  UpdateInfoPage,
  UpdatePasswordPage,
} from "./components/index";

function App() {
  return (
    <div>
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
      </Routes>
    </div>
  );
}

export default App;
