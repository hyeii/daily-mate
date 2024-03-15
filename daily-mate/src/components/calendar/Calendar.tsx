import { useEffect, useState } from "react";
import CalendarCells from "./CalendarCells";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";
import { addMonths, format, subMonths } from "date-fns";
import { accountByMonthResponse } from "../../types/accountType";
import InOutMonthly from "../account/InOutMonthly";
import { getAccountMonthly } from "../../apis/accountApi";
import { diaryByMonthResponse } from "../../types/diaryType";
import { getDiaryByMonth, getOtherDiaryByMonth } from "../../apis/diaryApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { whoseDiaryState } from "../../atoms/diaryAtom";
import styled from "styled-components";
import { selectedDateState } from "../../atoms/accountAtom";

export interface props {
  isMini: string;
  calendarType: string;
}

const Calendar = ({ isMini, calendarType }: props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const whoseDiary = useRecoilValue(whoseDiaryState);
  const setSelectedDate = useSetRecoilState(selectedDateState);
  const [accountByMonth, setAccountByMonth] =
    useState<accountByMonthResponse | null>(null);
  const [diaryByMonth, setDiaryByMonth] = useState<
    (diaryByMonthResponse | null)[]
  >([]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const setToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
  };

  const setCurrentDay = (day: Date) => {
    setCurrentMonth(day);
  };

  useEffect(() => {
    console.log("현재 월 : " + format(currentMonth, "yyyy-MM"));
    const fetchData = async () => {
      // 월별 거래 금액 조회 account/month
      if (calendarType === "account") {
        const accountMonthlyData: accountByMonthResponse[] | null =
          await getAccountMonthly(format(currentMonth, "yyyy-MM"));
        if (accountMonthlyData !== null) {
          setAccountByMonth(accountMonthlyData[0]);
        }
      }

      // 월별 일기 조회 (내 일기)
      if (calendarType === "myDiary") {
        const diaryMonthlyData: (diaryByMonthResponse | null)[] | null =
          await getDiaryByMonth(format(currentMonth, "yyyy-MM"));
        // userInfo id
        if (diaryMonthlyData !== null) {
          setDiaryByMonth(diaryMonthlyData);
        }
      }

      // 이외 월별 일기 조회
      if (calendarType === "otherDiary") {
        const otherDiaryMonthlyData: diaryByMonthResponse[] | null =
          await getOtherDiaryByMonth(
            format(currentMonth, "yyyy-MM"),
            whoseDiary
          );

        if (otherDiaryMonthlyData !== null) {
          setDiaryByMonth(otherDiaryMonthlyData);
        }
      }
    };

    fetchData();
  }, [calendarType, currentMonth, whoseDiary]);

  return (
    <CalendarWrapper ismini={isMini}>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        setToday={setToday}
        isMini={isMini}
      />
      {isMini === "not" && calendarType === "account" ? (
        <div>
          {accountByMonth !== null ? (
            <InOutMonthly
              totalInput={accountByMonth.totalInput}
              totalOutput={accountByMonth.totalOutput}
            />
          ) : (
            <div>loading</div>
          )}
          <Spacer />
        </div>
      ) : null}
      <CalendarDays isMini={isMini} />
      <CalendarCells
        currentMonth={currentMonth}
        setCurrentDay={() => setCurrentDay}
        accountByMonth={accountByMonth}
        diaryByMonth={diaryByMonth}
        calendarType={calendarType}
        isMini={isMini}
      />
      <TodayBtnContainer>
        <TodayBtn onClick={setToday}>오늘</TodayBtn>
      </TodayBtnContainer>
    </CalendarWrapper>
  );
};

export default Calendar;

interface calendarStyleProps {
  ismini: string;
}

const CalendarWrapper = styled.div<calendarStyleProps>`
  width: ${({ ismini }) =>
    ismini === "yes" ? "-webkit-fill-available" : "auto"};
  padding: 1rem;
  // border: 1px solid #e8e8e8;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Spacer = styled.div`
  height: 1rem;
`;

const TodayBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const TodayBtn = styled.button`
  background-color: #ff6161;
  color: white;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  padding: 6px 18px;
  font-family: "LeeSeoyun";
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #e45757;
  }

  &:active {
    transform: scale(1.05);
  }
`;
