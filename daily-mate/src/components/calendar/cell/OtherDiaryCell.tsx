import { useNavigate } from "react-router-dom";
import { diaryByMonthResponse } from "../../../types/diaryType";
import { useRecoilValue } from "recoil";
import { whoseDiaryState } from "../../../atoms/diaryAtom";

interface props {
  date: string;
  diaryInfo: diaryByMonthResponse;
}

const OtherDiaryCell = ({ date, diaryInfo }: props) => {
  // 다른 다이어리 셀에 필요한 정보 (다이어리 userId : recoil에 저장)
  // 해당 일자의 일기 정보
  // 해당 일자
  const navigate = useNavigate();
  const whoseDiary = useRecoilValue(whoseDiaryState);
  const handleDiary = () => {
    // 일기 있는 날만 클릭 허용
    if (diaryInfo.diaryId === null) return;

    navigate(`/diary/daily/${whoseDiary}/${date}`);
  };
  return (
    <div>
      <div>캘린더 다른 다이어리 셀</div>
      <div onClick={handleDiary}>{diaryInfo.title}</div>
    </div>
  );
};

export default OtherDiaryCell;
