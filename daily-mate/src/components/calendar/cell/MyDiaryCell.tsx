import { useNavigate } from "react-router-dom";
import { diaryByMonthResponse } from "../../../types/diaryType";

interface props {
  date: string;
  diaryInfo: diaryByMonthResponse;
}

const MyDiaryCell = ({ date, diaryInfo }: props) => {
  // 내 다이어리 셀에 필요한 정보
  // 해당 일자의 일기 정보
  // 해당 일자
  const navigate = useNavigate();
  const handleDiary = () => {
    // 일기가 없는 날 => 일기 작성하시겠습니까? => 일기 작성페이지
    // 일기 있는 날 => 해당 일기 페이지
    navigate(``);
  };
  return (
    <div>
      <div>캘린더 내 다이어리 셀</div>
    </div>
  );
};

export default MyDiaryCell;
