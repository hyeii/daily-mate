import axios, { AxiosResponse } from "axios";
import {
  myInfoResponse,
  signUpRequest,
  updatePasswordInput,
  userResponse,
} from "../types/authType";

export const checkNickname = async (nickname: string) => {
  try {
    const res: AxiosResponse<{ check: boolean }> = await axios.get(
      "/api/user/check-nickname",
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
      "/api/user/email/check",
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
      "/api/user/sign-up",
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

export const signIn = async (email: string, password: string) => {
  try {
    const res: AxiosResponse<userResponse> = await axios.post(
      "/api/user/login",
      {
        email: email,
        password: password,
      }
    );
    const signInResult = res.data;
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${signInResult.accessToken}`;
        return config;
      },
      (error) => {
        // TODO :  토큰 만료 가능성
      }
    );
    return signInResult;
  } catch (error) {
    console.error("로그인 오류 : ", error);
    alert();
    return null;
  }
};

export const logOut = async () => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      "/api/user/logout"
    );
    console.log(res.data.message);
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
    const res: AxiosResponse<{ message: string }> = await axios.put(
      "/api/user",
      {
        nickname: newNickname,
        profile: newProfile,
      }
    );
    console.log(res.data);

    try {
      const re_res: AxiosResponse<myInfoResponse> = await axios.get(
        "/api/user"
      );
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
      "/api/user/password",
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
