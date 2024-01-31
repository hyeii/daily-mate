import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import styled from "styled-components";
import { accountByMonthResponse } from "../../../types/accountType";
import { useSetRecoilState } from "recoil";
import { accountTabState, selectedDateState } from "../../../atoms/accountAtom";

interface props {
  currentMonth: Date;
  accountByMonth: accountByMonthResponse;
}

interface dayDivProps {
  isthismonth: string;
  istoday: string;
}

const CalendarCells = ({ currentMonth, accountByMonth }: props) => {
  const setAccountTab = useSetRecoilState(accountTabState);
  const setSelectedDate = useSetRecoilState(selectedDateState);

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
    setAccountTab("daily");
    setSelectedDate(format(day, "yyyy-MM-dd"));
    console.log(format(day, "yyyy-MM-dd"));
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
      days.push(
        <DayCover
          isthismonth={isThisMonth}
          istoday={isToday}
          key={index}
          onClick={() => handleSelectDate(curDay, isThisMonth)} // curDay 쓰는 이유 : 클로저
        >
          <DayInside isthismonth={isThisMonth} istoday={isToday}>
            {format(day, "d")}
          </DayInside>
          {isThisMonth === "thisMonth" ? (
            <div>
              <div>{accountByMonth.inputs[parseInt(format(day, "d"))]}</div>
              <div>{accountByMonth.outputs[parseInt(format(day, "d"))]}</div>
            </div>
          ) : (
            <div></div>
          )}
        </DayCover>
      );

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
  height: 7rem;
  border: ${({ istoday }) => (istoday === "today" ? "2px solid" : "0px")};
  border-color: ${({ istoday }) => (istoday === "today" ? "#ec9b9b" : "")};
  cursor: ${({ isthismonth }) =>
    isthismonth === "thisMonth" ? "pointer" : "default"};
  color: ${({ isthismonth }) =>
    isthismonth === "thisMonth" ? "black" : "#dddddd"};
`;

const DayInside = styled.span<dayDivProps>`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-weight: ${({ istoday }) => (istoday === "today" ? "bold" : "normal")};
  color: ${({ istoday }) => (istoday === "today" ? "#ec9b9b" : "inherit")};
`;

const RowInside = styled.div`
  display: flex;
  width: 100%;
  gap: 1;
`;
