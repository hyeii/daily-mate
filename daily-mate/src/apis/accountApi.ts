import { AxiosResponse } from "axios";
import { axios } from "./api";
import {
  CategoryByMonthMap,
  accountByDateResponse,
  accountByMonthResponse,
  accountRequest,
} from "../types/accountType";

export const addAccount = async (body: accountRequest) => {
  console.log(body);
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      "/account",
      body
    );
    console.log(res.data.message);
    alert("등록 완료");
  } catch (error) {
    console.error("내역 등록 오류 : ", error);
    alert("등록 정보를 확인해주세요");
  }
};

export const modifyAccount = async (
  body: accountRequest,
  accountId: number
) => {
  console.log(accountId, body);
  try {
    const res: AxiosResponse<{ message: string }> = await axios.patch(
      `/account/${accountId}`,
      body
    );
    console.log(res.data.message);
    alert("수정완료");
  } catch (error) {
    console.error("내역 수정 오류 : ", error);
    alert("등록 정보를 확인해주세요");
  }
};

export const deleteAccount = async (accountId: number) => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.delete(
      `/account/${accountId}`
    );
    console.log(res.data.message);
    alert("삭제완료");
  } catch (error) {
    console.error("내역 삭제 오류 : ", error);
    alert("다시 시도해 주세요");
  }
};

export const getAccountMonthly = async (date: string) => {
  try {
    const res: AxiosResponse<{ data: accountByMonthResponse }> =
      await axios.get("/account/month", {
        params: {
          date: date,
        },
      });
    return res.data.data;
  } catch (error) {
    console.error("월별 거래 금액 조회 오류 : ", error);
    return null;
  }
};

export const getAccountByCategory = async (date: string) => {
  try {
    const res: AxiosResponse<{ data: CategoryByMonthMap }> = await axios.get(
      `/account/category/map`,
      {
        params: {
          date: date,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.error("월별 지출 카테고리별 조회 오류 : ", error);
    return null;
  }
};

export const getAccountByDate = async (date: string) => {
  try {
    const res: AxiosResponse<{ data: accountByDateResponse[] }> =
      await axios.get(`/account`, {
        params: {
          date: date,
        },
      });
    return res.data.data;
  } catch (error) {
    console.error("날짜별 거래 내역조회 오류 : ", error);
    return null;
  }
};
