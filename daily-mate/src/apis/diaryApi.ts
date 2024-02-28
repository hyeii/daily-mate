import axios, { AxiosResponse } from "axios";
import { API, diaryAPI } from "./api";
import {
  commentBody,
  commentListResponse,
  diaryByDateResponse,
  diaryByMonthResponse,
  diaryRequest,
} from "../types/diaryType";

export const getDiaryByDiaryId = async (diaryId: number) => {
  try {
    const res = await API.get<diaryByDateResponse>(`/diary/${diaryId}`);
    return res.data;
  } catch (error) {
    console.error("일별 일기 조회 오류 : ", error);
    return null;
  }
};

export const getDiaryByMonth = async (date: string) => {
  try {
    const res = await API.get<diaryByMonthResponse[]>("/diary/month", {
      params: {
        date: date,
      },
    });
    return res.data;
  } catch (error) {
    console.error("월별 일기 조회 오류 : ", error);
    return null;
  }
};

export const getOtherDiaryByMonth = async (date: string, userId: number) => {
  try {
    const res = await API.get<diaryByMonthResponse[]>(
      `/diary/friend/${userId}/month`,
      {
        params: {
          date: date,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("다른 사람 월별 일기 조회 오류 : ", error);
    return null;
  }
};

// diaryAPI 분리 이전 자체 axios 호출 코드

// export const addDiary = async (formData: FormData) => {
//   try {
//     const res: AxiosResponse<{ message: string }> = await axios.post(
//       "http://localhost:8080/diary",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     );
//     console.log(res.data.message);
//     alert("일기 작성 완료");
//   } catch (error) {
//     console.error("일기 작성 오류 : ", error);
//   }
// };

export const addDiary = async (formData: FormData) => {
  try {
    const res: AxiosResponse<{ message: string }> = await diaryAPI.post(
      "/diary",
      formData
    );
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("일기 작성 오류 : ", error);
    return null;
  }
};

export const deleteDiary = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await API.delete(
      `/diary/${diaryId}`
    );
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("일기 삭제 오류 : ", error);
    return null;
  }
};

export const likeDiary = async (diaryId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await API.post(
      `/diary/like/${diaryId}`
    );
    console.log(res.data.message);
    return res.data;
  } catch (error) {
    console.error("일기 좋아요 오류 : ", error);
    return null;
  }
};

export const getCommentList = async (diaryId: number) => {
  try {
    const res = await API.get<commentListResponse[]>(`/comment/${diaryId}`);
    return res.data;
  } catch (error) {
    console.log(diaryId);
    console.error("댓글 전체 조회 오류 : ", error);
    return null;
  }
};

export const addComment = async (diaryId: number, body: commentBody) => {
  try {
    const res: AxiosResponse<{ message: string }> = await API.post(
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
    const res: AxiosResponse<{ message: string }> = await API.put(
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
    const res: AxiosResponse<{ message: string }> = await API.delete(
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
    const res: AxiosResponse<{ message: string }> = await API.post(
      `/comment/like/${commentId}`
    );
    console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("댓글 좋아요 오류 : ", error);
    return null;
  }
};
