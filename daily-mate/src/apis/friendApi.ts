import axios, { AxiosResponse } from "axios";
import { friendResponse } from "../types/authType";

export const getFriendList = async () => {
  try {
    const res: AxiosResponse<{ data: friendResponse[] }> = await axios.get(
      "/api/friend/request/all"
    );
    return res.data.data;
  } catch (error) {
    console.error("친구 목록 조회 오류 : ", error);
    return null;
  }
};
