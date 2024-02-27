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
import { useRecoilValue } from "recoil";
import { whoseDiaryState } from "../../atoms/diaryAtom";
import styled from "styled-components";

export interface props {
  isMini: string;
  calendarType: string;
}

const Calendar = ({ isMini, calendarType }: props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const whoseDiary = useRecoilValue(whoseDiaryState);
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
        } else setDiaryByMonth(diaryByMonthExample);
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
        } else setDiaryByMonth(diaryByMonthExample);
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
      {/* {accountByMonth ? ( */}
      <CalendarCells
        currentMonth={currentMonth}
        accountByMonth={accountByMonth}
        diaryByMonth={diaryByMonth}
        calendarType={calendarType}
        isMini={isMini}
      />
      {/* ) : } */}
    </CalendarWrapper>
  );
};

export default Calendar;

interface calendarStyleProps {
  ismini: string;
}

const CalendarWrapper = styled.div<calendarStyleProps>`
  width: ${({ ismini }) => (ismini === "yes" ? "30vw" : "auto")};
  padding: 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Spacer = styled.div`
  height: 1rem;
`;

const diaryByMonthExample: (diaryByMonthResponse | null)[] = [
  {
    diaryId: 100,
    title: "제목0",
    image: "이미지0",
    weather: "날씨0",
    feeling: "기분0",
  },
  {
    diaryId: 101,
    title: "제목1",
    image: "이미지1",
    weather: "날씨1",
    feeling: "기분1",
  },
  {
    diaryId: 102,
    title: "제목2",
    image: "이미지2",
    weather: "날씨2",
    feeling: "기분2",
  },
  {
    diaryId: 103,
    title: "제목3",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  null,
  null,
  {
    diaryId: 107,
    title: "제목7",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 108,
    title: "제목8",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 109,
    title: "제목9",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 110,
    title: "제목10",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  {
    diaryId: 112,
    title: "제목12",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  {
    diaryId: 1144,
    title: "제목14",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 115,
    title: "제목15",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  null,
  null,
  {
    diaryId: 119,
    title: "제목19",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  null,
  {
    diaryId: 122,
    title: "제목22",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  {
    diaryId: 124,
    title: "제목24",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 125,
    title: "제목25",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  null,
  {
    diaryId: 128,
    title: "제목28",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },

  {
    diaryId: 129,
    title: "제목29",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  {
    diaryId: 130,
    title: "제목30",
    image: "이미지3",
    weather: "날씨3",
    feeling: "기분3",
  },
  null,
  null,
];
