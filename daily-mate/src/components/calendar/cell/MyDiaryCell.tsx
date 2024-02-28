import { diaryByMonthResponse } from "../../../types/diaryType";

interface props {
  date: string;
  diaryInfo: diaryByMonthResponse | null;
}

const MyDiaryCell = ({ date, diaryInfo }: props) => {
  // 내 다이어리 셀에 필요한 정보
  // 해당 일자의 일기 정보
  // 해당 일자

  return <div>{diaryInfo && diaryInfo.title}</div>;
};

export default MyDiaryCell;
