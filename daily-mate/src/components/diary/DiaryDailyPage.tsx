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
import styled from "styled-components";

const DiaryDailyPage = () => {
  const { id, date } = useParams<diaryDailyParams>();
  const [isMyDiary, setIsMyDiary] = useState<boolean>(false);
  const userInfo = useRecoilValue(userInfoState);
  const [diaryDetail, setDiaryDetail] = useState<diaryByDateResponse>({
    diaryId: -1,
    title: "",
    content: "",
    date: "",
    image: "",
    weather: "",
    feeling: "",
    openType: "",
    createdAt: "0000-00-00",
    updatedAt: "0000-00-00",
    likeNum: 0,
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
        } else {
          setDiaryDetail({
            diaryId: 100,
            title: "제목",
            content: "내용",
            date: "날짜",
            image: "이미지",
            weather: "날씨",
            feeling: "기분",
            openType: "비공개",
            createdAt: "0000-00-00",
            updatedAt: "0000-00-00",
            likeNum: 3,
            isLike: false,
          });
        }
        setIsMyDiary(isMyDiary);
      }
    };
    fetchData();
  }, [date, id, userInfo.userId]);
  return (
    <DiaryDailyWrapper>
      <DiaryContainer>
        <div>{date}</div>
        <div>{diaryDetail.title}</div>
        <div>{diaryDetail.feeling}</div>
        <div>{diaryDetail.weather}</div>
        <div>{diaryDetail.content}</div>
        {isMyDiary ? (
          <button onClick={deleteDiaryNow}>다이어리 삭제</button>
        ) : null}
      </DiaryContainer>
      <CommentContainer>
        <DiaryComment diaryId={diaryDetail.diaryId} />
      </CommentContainer>
    </DiaryDailyWrapper>
  );
};

export default DiaryDailyPage;

const DiaryDailyWrapper = styled.div`
  width: auto;
  display: flex;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

const DiaryContainer = styled.div`
  @media screen and (min-width: 992px) {
    flex: 2 1 0;
  }
`;

const CommentContainer = styled.div`
  @media screen and (min-width: 992px) {
    flex: 1 1 0;
  }
`;
