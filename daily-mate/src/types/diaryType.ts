// "weather" : "맑음", "흐림", "눈", "비"
// "feeling" : "행복", "분노", "슬픔", "사랑", "우울", "무난"
// "openType" : "공개", "비공개", "친구공개"

export type diaryDailyParams = {
  id: string;
  date: string;
};

export interface diaryByMonthResponse {
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
  image: string;
  weather: string;
  feeling: string;
  openType: string;
  createdAt: Date;
  updatedAt: Date;
  likeNum: number;
  isLike: boolean;
}

export interface commentListResponse {
  nickname: string;
  content: string;
  likeNum: number;
  createdAt: Date;
  updatedAt: Date;
  isLiked: boolean;
}

export interface commentBody {
  nickname: string;
  content: string;
  likeNum: number;
  createdAt: Date;
  updatedAt: Date;
}
