import { AxiosResponse } from "axios";
import { axios } from "./api";
import { notifyResponse } from "../types/notificationType";

export const getNotify = async () => {
  try {
    const res: AxiosResponse<{ data: notifyResponse[] }> = await axios.get(
      "/alert"
    );
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("알림 목록 조회 오류 : ", error);
    return null;
  }
};

export const deleteNofity = async (alertId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `/alert/${alertId}`
    );

    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.log("알림 삭제 오류 : ", error);
    return null;
  }
};
