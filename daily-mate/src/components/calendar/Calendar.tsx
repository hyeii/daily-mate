import { useEffect, useState } from "react";
import CalendarCells from "./CalendarCells";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";
import { addMonths, format, subMonths } from "date-fns";
import { accountByMonthResponse } from "../../types/accountType";
import InOutMonthly from "../account/InOutMonthly";
import { getAccountMonthly } from "../../apis/accountApi";
import { diaryByMonthResponse } from "../../types/diaryType";

export interface props {
  isMini: string;
  calendarType: string;
}

const Calendar = ({ isMini, calendarType }: props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [accountByMonth, setAccountByMonth] = useState<accountByMonthResponse>({
    totalInput: 100,
    totalOutput: 300,
    inputs: [],
    outputs: [],
  });
  const [diaryByMonth, setDiaryByMonth] = useState<diaryByMonthResponse[]>([
    {
      title: "제목0",
      image: "이미지0",
      weather: "날씨0",
      feeling: "기분0",
    },
    {
      title: "제목1",
      image: "이미지1",
      weather: "날씨1",
      feeling: "기분1",
    },
    {
      title: "제목2",
      image: "이미지2",
      weather: "날씨2",
      feeling: "기분2",
    },
    {
      title: "제목3",
      image: "이미지3",
      weather: "날씨3",
      feeling: "기분3",
    },
  ]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const setToday = () => {
    setCurrentMonth(new Date());
  };

  useEffect(() => {
    console.log("현재 월 : " + format(currentMonth, "yyyy-MM"));
    const fetchData = async () => {
      // 월별 거래 금액 조회 account/month
      if (calendarType === "account") {
        console.log("가계부 캘린더 렌더링");
        const accountMonthlyData: accountByMonthResponse | null =
          await getAccountMonthly(format(currentMonth, "yyyy-MM"));
        if (accountMonthlyData !== null) {
          setAccountByMonth(accountMonthlyData);
        }
      }

      // 월별 일기 조회
      if (calendarType === "diary") {
        console.log("다이어리 캘린더 렌더링");
        //
      }
    };

    fetchData();
  }, [currentMonth]);

  return (
    <div>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        setToday={setToday}
        isMini={isMini}
      />
      {isMini === "not" && calendarType === "account" ? (
        <InOutMonthly
          totalInput={accountByMonth.totalInput}
          totalOutput={accountByMonth.totalOutput}
        />
      ) : null}
      <CalendarDays isMini={isMini} />
      <CalendarCells
        currentMonth={currentMonth}
        accountByMonth={accountByMonth}
        diaryByMonth={diaryByMonth}
        calendarType={calendarType}
        isMini={isMini}
      />
    </div>
  );
};

export default Calendar;
