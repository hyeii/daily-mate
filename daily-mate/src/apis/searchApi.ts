import axios, { AxiosResponse } from "axios";
import { searchResponse } from "../types/authType";

export const searchUser = async (nickname: string) => {
  try {
    const res: AxiosResponse<{ data: searchResponse[] }> = await axios.get(
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
