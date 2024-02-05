import { useEffect, useState } from "react";
import CalendarCells from "./CalendarCells";
import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";
import { addMonths, format, subMonths } from "date-fns";
import { accountByMonthResponse } from "../../types/accountType";
import InOutMonthly from "../account/InOutMonthly";
import { getAccountMonthly } from "../../apis/accountApi";

export interface props {
  isMini: string;
}

const Calendar = ({ isMini }: props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [accountByMonth, setAccountByMonth] = useState<accountByMonthResponse>({
    totalInput: 100,
    totalOutput: 300,
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
    const fetchData = async () => {
      // 월별 거래 금액 조회 account/month
      const accountMonthlyData: accountByMonthResponse | null =
        await getAccountMonthly(format(currentMonth, "yyyy-MM"));
      if (accountMonthlyData !== null) {
        setAccountByMonth(accountMonthlyData);
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
      {!isMini ?? (
        <InOutMonthly
          totalInput={accountByMonth.totalInput}
          totalOutput={accountByMonth.totalOutput}
        />
      )}
      <CalendarDays isMini={isMini} />
      <CalendarCells
        currentMonth={currentMonth}
        accountByMonth={accountByMonth}
        isMini={isMini}
      />
    </div>
  );
};

export default Calendar;
