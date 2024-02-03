import { addMonths, format, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import AccountMonthlyChart from "./AccountMonthlyChart";
import {
  CategoryByMonthMap,
  accountByMonthResponse,
} from "../../types/accountType";
import { getAccountByCategory, getAccountMonthly } from "../../apis/accountApi";

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
    const fetchData = async () => {
      // 월별 거래 금액 조회 account/month
      const accountMonthlyData: accountByMonthResponse | null =
        await getAccountMonthly(format(currentMonth, "yyyy-MM"));
      if (accountMonthlyData !== null) {
        setInOutByMonth(extractInOutValue(accountMonthlyData));
      }

      // 월별 지출 카테고리별 금액 조회
      const accountByCategoryData: CategoryByMonthMap | null =
        await getAccountByCategory(format(currentMonth, "yyyy-MM"));
      if (accountByCategoryData !== null) {
        setOutputByMonth(accountByCategoryData);
      }
    };

    fetchData();

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
