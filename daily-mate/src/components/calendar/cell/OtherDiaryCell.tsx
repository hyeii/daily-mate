import { diaryByMonthResponse } from "../../../types/diaryType";

interface props {
  date: string;
  diaryInfo: diaryByMonthResponse | null;
}

const OtherDiaryCell = ({ date, diaryInfo }: props) => {
  // 다른 다이어리 셀에 필요한 정보 (다이어리 userId : recoil에 저장)
  // 해당 일자의 일기 정보
  // 해당 일자

  return <div>{diaryInfo && diaryInfo.title}</div>;
};

export default OtherDiaryCell;
