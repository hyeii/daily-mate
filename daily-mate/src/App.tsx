import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  MainPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
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
      </Routes>
    </div>
  );
}

export default App;
