import { AxiosResponse } from "axios";
import {
  myInfoResponse,
  signUpRequest,
  updatePasswordInput,
  userResponse,
} from "../types/authType";
import { axios } from "./api";

export const checkNickname = async (nickname: string) => {
  try {
    const res: AxiosResponse<{ check: boolean }> = await axios.get(
      "/user/check-nickname",
      {
        params: {
          nickname: nickname,
        },
      }
    );
    return res.data.check;
  } catch (error) {
    console.error("닉네임 중복 확인 오류 : ", error);
    return error;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const res: AxiosResponse<{ check: boolean }> = await axios.get(
      "/user/email/check",
      {
        params: {
          email: email,
        },
      }
    );
    return res.data.check;
  } catch (error) {
    console.error("이메일 중복 확인 오류 : ", error);
    return error;
  }
};

export const signUp = async (body: signUpRequest) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      "/user/sign-up",
      body
    );
    console.log(res.data.message);
    alert("회원가입이 완료되었습니다. 로그인 후 이용해주세요");
    return true;
  } catch (error) {
    console.error("회원가입 오류:", error);
    alert("오류가 발생했습니다.");
    return false;
  }
};

export const useSignIn = () => {
  const signIn = async (email: string, password: string) => {
    try {
      const res: AxiosResponse<userResponse> = await axios.post("/user/login", {
        email: email,
        password: password,
      });
      const signInResult = res.data;
      window.localStorage.setItem("accessToken", signInResult.accessToken);
      return signInResult;
    } catch (error) {
      console.error("로그인 오류 : ", error);
      return null;
    }
  };

  return signIn;
};

export const logOut = async () => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      "/user/logout"
    );
    console.log(res.data.message);
    window.localStorage.removeItem("accessToken");
    return res.data;
  } catch (error) {
    console.error("로그아웃 오류 : ", error);
    alert("로그아웃 실패");
    return null;
  }
};

export const updateUserInfo = async (
  newNickname: string,
  newProfile: string
) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.put("/user", {
      nickname: newNickname,
      profile: newProfile,
    });
    console.log(res.data);

    try {
      const re_res: AxiosResponse<myInfoResponse> = await axios.get("/user");
      const result = re_res.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error("내 정보 조회 오류 : ", error);
      return null;
    }
  } catch (error) {
    console.error("내 정보 수정 오류 : ", error);
    alert("입력 정보를 확인해주세요");
    return null;
  }
};

export const updateUserPassword = async (
  passwordInput: updatePasswordInput
) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.patch(
      "/user/password",
      passwordInput
    );
    const result = res.data;
    console.log(result);
    alert("비밀번호가 변경되었습니다");
    return result;
  } catch (error) {
    console.error("비밀번호 변경 오류 : ", error);
    alert("비밀번호를 다시 확인해주세요");
    return null;
  }
};
