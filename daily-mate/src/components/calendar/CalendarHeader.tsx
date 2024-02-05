import { format } from "date-fns";

interface props {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  setToday: () => void;
  isMini: string;
}

const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  setToday,
  isMini,
}: props) => {
  return (
    <div>
      <div>{format(currentMonth, "yyyy")}</div>
      <button onClick={prevMonth}>이전</button>
      <span>{format(currentMonth, "M")}월</span>
      <button onClick={nextMonth}>다음</button>
      <button onClick={setToday}>오늘</button>
    </div>
  );
};

export default CalendarHeader;
