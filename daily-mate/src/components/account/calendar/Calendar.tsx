import { useEffect, useState } from "react";
import CalendarCells from "./CalendarCells";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";
import { addMonths, format, subMonths } from "date-fns";
import { accountByMonthResponse } from "../../../types/accountType";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [accountByMonth, setAccountByMonth] = useState<accountByMonthResponse>({
    totalInput: 0,
    totalOutput: 0,
    inputs: [],
    outputs: [],
  });

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
    // 월별 거래 금액 조회 account/month RequestParam : format(currentMonth, "yyyy-MM")
    // 조회 성공 시 setAccountByMonth
  }, [currentMonth]);

  return (
    <div>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        setToday={setToday}
      />
      <CalendarDays />
      <CalendarCells
        currentMonth={currentMonth}
        accountByMonth={accountByMonth}
      />
    </div>
  );
};

export default Calendar;
