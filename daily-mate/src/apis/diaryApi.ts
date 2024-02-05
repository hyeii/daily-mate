import axios, { AxiosResponse } from "axios";
import { diaryByDateResponse } from "../types/diaryType";

export const getDiaryByDate = async (date: string) => {
  try {
    const res: AxiosResponse<{ data: diaryByDateResponse }> = await axios.get(
      "/api/diary/date",
      {
        params: {
          date: date,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("일별 일기 조회 오류 : ", error);
    return null;
  }
};
