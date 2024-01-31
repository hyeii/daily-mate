import { addMonths, format, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

const AccountMonthly = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const currentDate = format(currentMonth, "M");
  const formatDate = format(currentMonth, "yyyy-MM");

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  useEffect(() => {
    // 월별 지출 카테고리별 금액 조회 /account/category
    console.log(formatDate);
  }, [currentMonth, formatDate]);

  return (
    <div>
      <div>월 통계</div>
      <div>
        <button onClick={prevMonth}>이전</button>
        <span>{currentDate}</span>
        <button onClick={nextMonth}>다음</button>
      </div>
      <div>{formatDate}</div>
      <BarChart />
    </div>
  );
};

export default AccountMonthly;
