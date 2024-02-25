import { AxiosResponse } from "axios";
import { API } from "./api";
import { searchResponse } from "../types/authType";

export const searchUser = async (nickname: string) => {
  try {
    const res: AxiosResponse<{ data: searchResponse[] }> = await API.get(
      "/user/search",
      {
        params: {
          nickname: nickname,
        },
      }
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("사용자 검색 오류 : ", error);
    return null;
  }
};
