// "weather" : "맑음", "흐림", "눈", "비"
// "feeling" : "행복", "분노", "슬픔", "사랑", "우울", "무난"
// "openType" : "공개", "비공개", "친구공개"

export type diaryDailyParams = {
  id: string;
  date: string;
};

export type diaryMonthlyParams = {
  id: string;
};

export interface diaryByMonthResponse {
  diaryId: number;
  title: string;
  image: string;
  weather: string;
  feeling: string;
}

export interface diaryByDateResponse {
  diaryId: number;
  title: string;
  content: string;
  date: string;
  image: string | null;
  weather: string;
  feeling: string;
  openType: string;
  createdAt: string;
  updatedAt: string | null;
  likeNum: number;
  isLike: boolean;
}

export interface diaryRequest {
  title: string;
  content: string;
  date: string;
  weather: string;
  feeling: string;
  openType: string;
}

export interface commentListResponse {
  commentId: number;
  nickname: string;
  content: string;
  likeNum: number;
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
}

export interface commentBody {
  content: string;
}
