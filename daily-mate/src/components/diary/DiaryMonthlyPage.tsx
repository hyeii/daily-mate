import { useParams } from "react-router-dom";
import Calendar from "../calendar/Calendar";
import { diaryMonthlyParams } from "../../types/diaryType";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { whoseDiaryState } from "../../atoms/diaryAtom";
import { userInfoState } from "../../atoms/authAtom";
import { getUserByUserId } from "../../apis/authApis";
import styled from "styled-components";

const DiaryMonthlyPage = () => {
  const { userId } = useParams<diaryMonthlyParams>();
  const userInfo = useRecoilValue(userInfoState);
  const setWhoseDiary = useSetRecoilState(whoseDiaryState);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== undefined) {
        const res = await getUserByUserId(parseInt(userId));
        if (res) {
          setUserName(res.nickname);
        }
      }
    };
    if (userId !== undefined) {
      setWhoseDiary(parseInt(userId));
      fetchData();
    }
  }, [userId, setWhoseDiary]);

  return (
    <div>
      {userId !== undefined && parseInt(userId) === userInfo.userId ? (
        <DiaryOwner>나의 일기</DiaryOwner>
      ) : (
        <DiaryOwner>{userName}님의 일기</DiaryOwner>
      )}
      {userId !== undefined && parseInt(userId) === userInfo.userId ? (
        <Calendar isMini="not" calendarType="myDiary" />
      ) : (
        <Calendar isMini="not" calendarType="otherDiary" />
      )}
    </div>
  );
};

export default DiaryMonthlyPage;

const DiaryOwner = styled.h2`
  font-size: 1.5rem;
`;
