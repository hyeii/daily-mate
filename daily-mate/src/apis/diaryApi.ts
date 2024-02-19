import { AxiosResponse } from "axios";
import { axios } from "./api";
import {
  commentBody,
  commentListResponse,
  diaryByDateResponse,
  diaryByMonthResponse,
  diaryRequest,
} from "../types/diaryType";

export const getDiaryByDate = async (date: string) => {
  try {
    const res: AxiosResponse<{ data: diaryByDateResponse }> = await axios.get(
      "/diary/date",
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

export const getDiaryByMonth = async (date: string, userId: number) => {
  try {
    const res: AxiosResponse<{ data: diaryByMonthResponse[] }> =
      await axios.get("/diary/month", {
        params: {
          date: date,
        },
      });
    return res.data.data;
  } catch (error) {
    console.error("월별 일기 조회 오류 : ", error);
    return null;
  }
};

export const getOtherDiaryByDate = async (date: string, diaryId: number) => {
  try {
    const res: AxiosResponse<{ data: diaryByDateResponse }> = await axios.get(
      `/diary/friend/${diaryId}`,
      {
        params: {
          date: date,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("다른 사람 일별 일기 조회 오류 : ", error);
    return null;
  }
};

export const getOtherDiaryByMonth = async (date: string, userId: number) => {
  try {
    const res: AxiosResponse<{ data: diaryByMonthResponse[] }> =
      await axios.get(`/diary/friend/${userId}/month`, {
        params: {
          date: date,
        },
      });
    return res.data.data;
  } catch (error) {
    console.log("다른 사람 월별 일기 조회 오류 : ", error);
    return null;
  }
};

export const addDiary = async (diaryData: diaryRequest, image: File | null) => {
  try {
    const formData = new FormData();
    formData.append("diaryReqDto", JSON.stringify(diaryData));
    if (image) {
      formData.append("image", image);
    }

    const res: AxiosResponse<{ message: string }> = await axios.post("/diary", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.message);
    alert("일기 작성 완료");
  } catch (error) {
    console.error("일기 작성 오류 : ", error);
  }
};

export const deleteDiary = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `/diary/${diaryId}`
    );
    console.log(res.data.message);
    alert("일기 삭제 완료");
  } catch (error) {
    console.error("일기 삭제 오류 : ", error);
  }
};

export const likeDiary = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      `/diary/like/${diaryId}`
    );
    console.log(res.data.message);
  } catch (error) {
    console.error("일기 좋아요 오류 : ", error);
  }
};

export const getCommentList = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ data: commentListResponse[] }> = await axios.get(
      `/comment/${diaryId}`
    );
    return res.data.data;
  } catch (error) {
    console.error("댓글 전체 조회 오류 : ", error);
    return null;
  }
};

export const addComment = async (diaryId: number, body: commentBody) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      `/comment/${diaryId}`,
      body
    );
    alert("댓글 작성 완료");
    console.log(res.data.message);
  } catch (error) {
    console.error("댓글 작성 오류 : ", error);
  }
};

export const updateComment = async (commentId: number, body: commentBody) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.put(
      `/comment/${commentId}`,
      body
    );
    alert("댓글 수정 완료");
    console.log(res.data.message);
  } catch (error) {
    console.error("댓글 수정 오류 : ", error);
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `/comment/${commentId}`
    );
    alert("댓글 삭제 완료");
    console.log(res.data.message);
  } catch (error) {
    console.error("댓글 삭제 오류 : ", error);
  }
};

export const likeComment = async (commentId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      `/comment/like/${commentId}`
    );
    console.log(res.data.message);
  } catch (error) {
    console.error("댓글 좋아요 오류 : ", error);
  }
};
