import axios, { AxiosResponse } from "axios";
import {
  getInfoResponse,
  myInfoResponse,
  reIssueTokenResponse,
  signUpRequest,
  updatePasswordInput,
  userResponse,
} from "../types/authType";
import { API, diaryAPI, foreAPI } from "./api";

export const checkNickname = async (nickname: string) => {
  try {
    const res = await foreAPI.get<boolean>("/user/check/nickname", {
      params: {
        nickname: nickname,
      },
    });
    return res.data;
  } catch (error) {
    console.error("닉네임 중복 확인 오류 : ", error);
    return null;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const res = await foreAPI.get<boolean>("/user/check/email", {
      params: {
        email: email,
      },
    });
    return res.data;
  } catch (error) {
    console.error("이메일 중복 확인 오류 : ", error);
    return null;
  }
};

export const signUp = async (body: signUpRequest) => {
  try {
    const res: AxiosResponse<{ message: string }> = await foreAPI.post(
      "/user/sign-up",
      body
    );

    return res.data.message;
  } catch (error) {
    console.error("회원가입 오류:", error);
    return null;
  }
};

export const useSignIn = () => {
  const signIn = async (email: string, password: string) => {
    try {
      const res: AxiosResponse<userResponse> = await foreAPI.post(
        "/user/login",
        {
          email: email,
          password: password,
        }
      );
      const signInResult = res.data;
      window.localStorage.setItem("accessToken", signInResult.accessToken);
      window.localStorage.setItem("refreshToken", signInResult.refreshToken);
      return signInResult;
    } catch (error) {
      console.error("로그인 오류 : ", error);
      return null;
    }
  };

  return signIn;
};

export const getReissueToken = async () => {
  try {
    const headers = {
      "refresh-token": window.localStorage.getItem("refreshToken"),
    };
    const res = await API.post<reIssueTokenResponse>(
      "user/reissue-token",
      null,
      {
        headers,
      }
    );
    return res;
  } catch (error) {
    console.error("토큰 재발급 오류 : ", error);
    return null;
  }
};

export const logOut = async () => {
  try {
    const res: AxiosResponse<{ message: string }> = await API.post(
      "user/logout"
    );
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
    const res: AxiosResponse<{ message: string }> = await API.patch("/user", {
      nickname: newNickname,
      profile: newProfile,
    });
    console.log(res.data);

    try {
      const re_res: AxiosResponse<myInfoResponse> = await API.get("/user");
      const result = re_res.data;
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
    const res: AxiosResponse<{ message: string }> = await API.patch(
      "/user/password",
      passwordInput
    );
    alert("비밀번호가 변경되었습니다");
    return res.data;
  } catch (error) {
    console.error("비밀번호 변경 오류 : ", error);
    alert("비밀번호를 다시 확인해주세요");
    return null;
  }
};

export const getUserByUserId = async (userId: number) => {
  try {
    const res = await API.get<getInfoResponse>(`/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error("userId로 정보 조회 오류 : ", error);
    return null;
  }
};

export const googleLogIn = async (token: string) => {
  try {
    const socialAPI = axios.create({
      baseURL: process.env.REACT_APP_URL,
      headers: {
        Authorization: token,
      },
    });
    const res = await socialAPI.get<userResponse>("/oauth/login-info");

    return res.data;
  } catch (error) {
    console.error("구글 로그인 에러 : ", error);
    return null;
  }
};

export const kakaoLogIn = async (token: string) => {
  try {
    const socialAPI = axios.create({
      baseURL: process.env.REACT_APP_URL,
      headers: {
        Authorization: token,
      },
    });
    const res = await socialAPI.get<userResponse>("/oauth/login-info");

    return res.data;
  } catch (error) {
    console.error("카카오 로그인 에러 : ", error);
    return null;
  }
};

export const deleteUser = async () => {
  try {
    const res = await API.delete("/user");
    return res.data;
  } catch (error) {
    console.error("회원 탈퇴 오류 : ", error);
    return null;
  }
};

export const updateImage = async (formData: FormData) => {
  try {
    const res = await diaryAPI.post("/user/image", formData);
    console.log(res.data);
    try {
      const re_res: AxiosResponse<myInfoResponse> = await API.get("/user");
      const result = re_res.data;

      return result;
    } catch (error) {
      console.error("내 정보 조회 오류 : ", error);
      return null;
    }
  } catch (error) {
    console.error("이미지 변경 오류 : ", error);
    return null;
  }
};

export const deleteImage = async () => {
  try {
    const res = await API.delete("user/image");
    console.log(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const checkPassword = async (password: string) => {
  try {
    const res = await API.post("user/password", {
      password: password,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return null;
  }
};
