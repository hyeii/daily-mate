import { API } from "./api";
import { searchResponse } from "../types/authType";

export const searchUser = async (nickname: string) => {
  try {
    const res = await API.get<searchResponse[]>("/user/search", {
      params: {
        nickname: nickname,
      },
    });
    return res.data;
  } catch (error) {
    console.error("사용자 검색 오류 : ", error);
    return null;
  }
};
