// "weather" : "맑음", "흐림", "눈", "비"
// "feeling" : "행복", "분노", "슬픔", "사랑", "우울", "무난"
// "openType" : "공개", "비공개", "친구공개"

export interface diaryByMonthResponse {
  title: string;
  image: string;
  weather: string;
  feeling: string;
}
