import { useEffect, useState } from "react";
import Calendar from "./calendar/Calendar";
import { accountByDateResponse } from "../../types/accountType";
import AccountHistory from "./AccountHistory";
import { getAccountByDate } from "../../apis/accountApi";
import BarChart from "./BarChart";

interface props {
  currentDay: string;
}

const AccountDaily = ({ currentDay }: props) => {
  const [accountListByDate, setAccountListByDate] = useState<
    accountByDateResponse[]
  >([
    {
      accountId: 1,
      amount: 500,
      category: "카페",
      content: "막대사탕",
      date: "2024-02-03",
      type: "지출",
      userId: 321,
    },
    {
      accountId: 2,
      amount: 4500,
      category: "식비",
      content: "군것질",
      date: "2024-01-23",
      type: "지출",
      userId: 321,
    },
  ]);
  const [dailyOutput, setDailyOutput] = useState<number[]>([]);

  useEffect(() => {
    // currentDay가 바뀔 떄 마다 /account GET요청
    const fetchData = async () => {
      const accountByDateData: accountByDateResponse[] | null =
        await getAccountByDate(currentDay);
      if (accountByDateData !== null) {
        setAccountListByDate(accountByDateData);
      }
      const cate = ["식비", "카페", "생활", "교통", "기타"];

      const dailyOutputResult: number[] = Array(5).fill(0);
      accountListByDate.forEach((account) => {
        const idx = cate.indexOf(account.category);
        if (idx !== -1) {
          // 없는 카테고리일땐 -1 반환해서
          dailyOutputResult[idx] += account.amount;
        }
      });
      setDailyOutput(dailyOutputResult);
    };

    fetchData();
  }, [currentDay]);
  return (
    <div>
      <div>일 통계</div>
      <div>{currentDay}</div>
      <Calendar isMini={"yes"} />
      <BarChart outputValue={dailyOutput} />
      <AccountHistory accountList={accountListByDate} />
    </div>
  );
};

export default AccountDaily;
