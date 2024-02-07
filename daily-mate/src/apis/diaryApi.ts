import axios, { AxiosResponse } from "axios";
import {
  commentBody,
  commentListResponse,
  diaryByDateResponse,
} from "../types/diaryType";

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

export const getCommentList = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ data: commentListResponse[] }> = await axios.get(
      `/api/comment/${diaryId}`
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
      `/api/comment/${diaryId}`,
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
      `/api/comment/${commentId}`,
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
      `/api/comment/${commentId}`
    );
    alert("댓글 삭제 완료");
    console.log(res.data.message);
  } catch (error) {
    console.error("댓글 삭제 오류 : ", error);
  }
};
