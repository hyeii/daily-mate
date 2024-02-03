import { useEffect, useState } from "react";
import Calendar from "./calendar/Calendar";
import { accountByDateResponse } from "../../types/accountType";
import AccountHistory from "./AccountHistory";

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
      category: "식비",
      content: "막대사탕",
      date: "2024-02-03",
      type: "지출",
      userId: 321,
    },
  ]);
  useEffect(() => {
    // currentDay가 바뀔 떄 마다 /account GET요청
  }, [currentDay]);
  return (
    <div>
      <div>일 통계</div>
      <div>{currentDay}</div>
      <Calendar isMini={"yes"} />
      <AccountHistory accountList={accountListByDate} />
    </div>
  );
};

export default AccountDaily;
