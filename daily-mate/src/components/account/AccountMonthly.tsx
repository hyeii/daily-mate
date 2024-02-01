import { addMonths, format, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import AccountMonthlyChart from "./AccountMonthlyChart";
import {
  CategoryByMonthMap,
  accountByMonthResponse,
} from "../../types/accountType";

const AccountMonthly = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const currentDate = format(currentMonth, "M");
  const formatDate = format(currentMonth, "yyyy-MM");
  const [outputByMonth, setOutputByMonth] = useState<CategoryByMonthMap>({
    식비: 100000,
    교통: 80000,
  });
  const [inOutByMonth, setInOutByMonth] = useState<number[]>([50000, 30000]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const extractInOutValue = (object: accountByMonthResponse): number[] => {
    return [object.totalInput ?? 0, object.totalOutput ?? 0];
  };

  useEffect(() => {
    // 월별 지출 카테고리별 금액 조회 /account/category/map => setOutputByMonth
    // 월별 거래 금액 조회 account/month RequestParam : format(currentMonth, "yyyy-MM") => extractInOutValue 넣어서 setInOutByMonth
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
      <AccountMonthlyChart outputs={outputByMonth} inOutValues={inOutByMonth} />
    </div>
  );
};

export default AccountMonthly;
