import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { diaryByDateResponse, diaryDailyParams } from "../../types/diaryType";
import {
  deleteDiary,
  getDiaryByDate,
  getOtherDiaryByDate,
} from "../../apis/diaryApi";
import DiaryComment from "./DiaryComment";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/authAtom";

const DiaryDailyPage = () => {
  const { id, date } = useParams<diaryDailyParams>();
  const [isMyDiary, setIsMyDiary] = useState<boolean>(false);
  const userInfo = useRecoilValue(userInfoState);
  const [diaryDetail, setDiaryDetail] = useState<diaryByDateResponse>({
    diaryId: 100,
    title: "제목",
    content: "내용",
    date: "날짜",
    image: "이미지",
    weather: "날씨",
    feeling: "기분",
    openType: "비공개",
    createdAt: new Date(),
    updatedAt: new Date(),
    likeNum: 3,
    isLike: false,
  });
  const deleteDiaryNow = () => {
    deleteDiary(diaryDetail.diaryId);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (date !== undefined && id !== undefined) {
        const isMyDiary: boolean = parseInt(id) === userInfo.userId;
        const diaryByDateData: diaryByDateResponse | null = isMyDiary
          ? await getDiaryByDate(date)
          : await getOtherDiaryByDate(date, userInfo.userId);
        if (diaryByDateData !== null) {
          setDiaryDetail(diaryByDateData);
        }
        setIsMyDiary(isMyDiary);
      }
    };
    fetchData();
  }, [date, id, userInfo.userId]);
  return (
    <div>
      <h3>다이어리 상세</h3>

      <div>{date}</div>
      <div>{diaryDetail.feeling}</div>
      <DiaryComment diaryId={diaryDetail.diaryId} />
      {isMyDiary ? (
        <button onClick={deleteDiaryNow}>다이어리 삭제</button>
      ) : null}
    </div>
  );
};

export default DiaryDailyPage;
