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
import { userInfoState } from "../../atoms/authAtom";
import { useRecoilValue } from "recoil";
import { whoseDiaryState } from "../../atoms/diaryAtom";

export interface props {
  isMini: string;
  calendarType: string;
}

const Calendar = ({ isMini, calendarType }: props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const userInfo = useRecoilValue(userInfoState);
  const whoseDiary = useRecoilValue(whoseDiaryState);
  const [accountByMonth, setAccountByMonth] = useState<accountByMonthResponse>({
    totalInput: 100,
    totalOutput: 300,
    inputs: [],
    outputs: [],
  });
  const [diaryByMonth, setDiaryByMonth] = useState<diaryByMonthResponse[]>([
    {
      diaryId: 123,
      title: "제목0",
      image: "이미지0",
      weather: "날씨0",
      feeling: "기분0",
    },
    {
      diaryId: 124,
      title: "제목1",
      image: "이미지1",
      weather: "날씨1",
      feeling: "기분1",
    },
    {
      diaryId: 125,
      title: "제목2",
      image: "이미지2",
      weather: "날씨2",
      feeling: "기분2",
    },
    {
      diaryId: 126,
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

      // 월별 일기 조회 (내 일기)
      if (calendarType === "myDiary") {
        console.log("내 다이어리 캘린더 렌더링");
        const diaryMonthlyData: diaryByMonthResponse[] | null =
          await getDiaryByMonth(format(currentMonth, "yyyy-MM"), 123);
        // userInfo id
        if (diaryMonthlyData !== null) {
          setDiaryByMonth(diaryMonthlyData);
        }
      }

      // 이외 월별 일기 조회
      if (calendarType === "otherDiary") {
        console.log("타인 다이어리 캘린더 렌더링");
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
