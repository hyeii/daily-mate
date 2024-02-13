import { useParams } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import { diaryMonthlyParams } from "../../types/diaryType";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { whoseDiaryState } from "../../atoms/diaryAtom";
import { userInfoState } from "../../atoms/authAtom";

const DiaryMonthlyPage = () => {
  const { id } = useParams<diaryMonthlyParams>();
  const userInfo = useRecoilValue(userInfoState);
  const setWhoseDiary = useSetRecoilState(whoseDiaryState);

  useEffect(() => {
    if (id !== undefined) setWhoseDiary(parseInt(id));
  }, [id, setWhoseDiary]);

  return (
    <div>
      <h3>다이어리 먼슬리</h3>
      {/* useParams : id => 내 아이디이면 내 일기, 내 아이디가 아니라면 다른 사람의 일기 */}
      {id !== undefined && parseInt(id) === userInfo.userId ? (
        <Calendar isMini="not" calendarType="myDiary" />
      ) : (
        <Calendar isMini="not" calendarType="otherDiary" />
      )}
    </div>
  );
};

export default DiaryMonthlyPage;
