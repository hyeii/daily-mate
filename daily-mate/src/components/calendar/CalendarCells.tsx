import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";
import { accountByMonthResponse } from "../../types/accountType";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accountTabState, selectedDateState } from "../../atoms/accountAtom";
import { diaryByMonthResponse } from "../../types/diaryType";
import { useNavigate } from "react-router-dom";
import AccountCell from "./cell/AccountCell";
import MyDiaryCell from "./cell/MyDiaryCell";
import OtherDiaryCell from "./cell/OtherDiaryCell";

interface props {
  currentMonth: Date;
  accountByMonth: accountByMonthResponse;
  diaryByMonth: diaryByMonthResponse[];
  calendarType: string;
  isMini: string;
}

interface dayDivProps {
  isthismonth: string;
  istoday: string;
  isselected: string;
  ismini: string;
}

const CalendarCells = ({
  currentMonth,
  accountByMonth,
  diaryByMonth,
  calendarType,
  isMini,
}: props) => {
  const setAccountTab = useSetRecoilState(accountTabState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const navigate = useNavigate();

  const monthStart = startOfMonth(currentMonth); // 이번달(currentMonth)기준으로 이번달의 시작일
  const monthEnd = endOfMonth(currentMonth); // 이번달(currentMonth)기준으로 이번달 마지막일
  const startDate = startOfWeek(monthStart); // 이번달 시작일이 포함된 주의 시작일
  const endDate = endOfWeek(monthEnd); // 이번달 마지막일이 포함된 주의 마지막일

  const today = new Date();
  const rows = [];

  const handleSelectDate = (day: Date, isThisMonth: string) => {
    if (isThisMonth === "otherMonth") {
      return;
    }
    setSelectedDate(format(day, "yyyy-MM-dd"));
    console.log(format(day, "yyyy-MM-dd"));

    if (calendarType === "account") setAccountTab("daily");
    if (calendarType === "diary") {
      navigate(`/diary/daily/id/${format(day, "yyyy-MM-dd")}`);
    }
  };

  let days = [];
  let day = startDate;
  let index = 0; // 달력 시작지점부터 카운트, key 지정할거 말고는 필요가 있나...?
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const curDay = day;

      const isThisMonth: string =
        format(currentMonth, "M") === format(day, "M")
          ? "thisMonth"
          : "otherMonth";

      const isToday: string =
        format(today, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
          ? "today"
          : "notToday";

      const isSelected: string =
        format(day, "yyyy-MM-dd") === selectedDate ? "selected" : "others";

      days.push(
        <DayCover
          isthismonth={isThisMonth}
          istoday={isToday}
          ismini={isMini}
          isselected={isSelected}
          key={index}
          onClick={() => handleSelectDate(curDay, isThisMonth)} // curDay 쓰는 이유 : 클로저
        >
          <DayInside
            isthismonth={isThisMonth}
            istoday={isToday}
            ismini={isMini}
            isselected={isSelected}
          >
            {format(day, "d")}
          </DayInside>
          {isThisMonth === "thisMonth" &&
          calendarType === "account" &&
          isMini === "not" ? (
            <div>
              <AccountCell
                date={format(day, "yyyy-MM-dd")}
                input={accountByMonth.inputs[parseInt(format(day, "d"))]}
                output={accountByMonth.outputs[parseInt(format(day, "d"))]}
              />
            </div>
          ) : isThisMonth === "thisMonth" && calendarType === "myDiary" ? (
            <div>
              {/* length 조건 삼항연산자 건 이유 : 
              더미데이터로 넣은 값이 30,31일만큼 채운 값이 아닌 확인용 짧은 배열이라 배열의 길이를 넘어가는 날짜에서는 오류가 발생함. 
              실제 데이터 받아오면 필요 X */}
              {diaryByMonth.length > parseInt(format(day, "d")) ? (
                <div>
                  <MyDiaryCell
                    date={format(day, "yyyy-MM-dd")}
                    diaryInfo={diaryByMonth[parseInt(format(day, "d"))]}
                  />
                </div>
              ) : null}
            </div>
          ) : isThisMonth === "thisMonth" && calendarType === "otherDiary" ? (
            <div>
              {diaryByMonth.length > parseInt(format(day, "d")) ? (
                <div>
                  <OtherDiaryCell
                    date={format(day, "yyyy-MM-dd")}
                    diaryInfo={diaryByMonth[parseInt(format(day, "d"))]}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </DayCover>
      );
      // 내 일기인 경우와 다른 사람의 일기인 경우 발생 이벤트 다르게 추후 설정 필요

      day = addDays(day, 1);
      index++;
    }

    rows.push(<RowInside key={index}>{days}</RowInside>);

    days = [];
  }

  return <FullCells>{rows}</FullCells>;
};

export default CalendarCells;

const FullCells = styled.div`
  width: 70%;
  justify-content: center;
`;

const DayCover = styled.div<dayDivProps>`
  width: 100%;
  height: ${({ ismini }) => (ismini === "yes" ? "2rem" : "7rem")};
  border: ${({ istoday, ismini }) =>
    istoday === "today" && ismini === "not" ? "2px solid" : "0px"};
  border-color: ${({ istoday }) => (istoday === "today" ? "#ec9b9b" : "")};
  cursor: ${({ isthismonth }) =>
    isthismonth === "thisMonth" ? "pointer" : "default"};
  color: ${({ isthismonth, isselected, ismini }) =>
    isthismonth === "thisMonth" && isselected === "selected" && ismini === "yes"
      ? "blue"
      : isthismonth === "thisMonth"
      ? "black"
      : "#dddddd"};
`;

const DayInside = styled.span<dayDivProps>`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: ${({ istoday, isselected, ismini }) =>
    istoday === "today"
      ? "bold"
      : isselected === "selected" && ismini === "yes"
      ? "bold"
      : "normal"};
  color: ${({ istoday }) => (istoday === "today" ? "#ec9b9b" : "inherit")};
`;

const RowInside = styled.div`
  display: flex;
  width: 100%;
  gap: 1;
`;
