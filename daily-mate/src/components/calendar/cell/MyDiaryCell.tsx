import { useNavigate } from "react-router-dom";
import { diaryByMonthResponse } from "../../../types/diaryType";
import { userInfoState } from "../../../atoms/authAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { writeDate } from "../../../atoms/diaryAtom";

interface props {
  date: string;
  diaryInfo: diaryByMonthResponse | null;
}

const MyDiaryCell = ({ date, diaryInfo }: props) => {
  // 내 다이어리 셀에 필요한 정보
  // 해당 일자의 일기 정보
  // 해당 일자
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState);
  const setWriteDate = useSetRecoilState(writeDate);
  const handleDiary = () => {
    console.log("handleDiary");
    if (diaryInfo !== null && diaryInfo.diaryId === null) {
      if (
        window.confirm("해당 일자의 일기가 없습니다. 새로운 일기를 작성할까요?")
      ) {
        setWriteDate(date);
        navigate("/diary/daily/write");
      }
    }
    // 일기가 없는 날 => 일기 작성하시겠습니까? => 일기 작성페이지
    // 일기 있는 날 => 해당 일기 페이지
    navigate(`/diary/daily/${userInfo.userId}/${date}`);
  };
  return <div>{diaryInfo && diaryInfo.title}</div>;
};

export default MyDiaryCell;
