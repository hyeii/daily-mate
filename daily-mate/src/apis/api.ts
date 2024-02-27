import axios from "axios";
import { getReissueToken } from "./authApis";

export const foreAPI = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const API = axios.create({
  baseURL: process.env.REACT_APP_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// https://s0ojin.tistory.com/44

API.interceptors.response.use(
  // 정상 응답 처리
  (response) => {
    return response;
  },
  // 에러 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    // 토큰 만료시 401이므로 수행
    if (status === 401) {
      const originRequest = config;
      const res = await getReissueToken();

      if (res && res.status === 200) {
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        API.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originRequest);
      } else if (res && res.status === 404) {
        // 리프레시토큰도 만료, 재로그인요청
      } else {
      }
    }
    return Promise.reject(error);
  }
);
