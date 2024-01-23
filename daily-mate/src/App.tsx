import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/main/MainPage";
import SignInPage from "./components/auth/SignInPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
