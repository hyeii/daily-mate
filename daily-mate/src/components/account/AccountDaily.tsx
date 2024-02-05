import { useEffect, useState } from "react";
import Calendar from "./calendar/Calendar";
import { accountByDateResponse } from "../../types/accountType";
import AccountHistory from "./AccountHistory";
import { getAccountByDate } from "../../apis/accountApi";

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
  ]);

  useEffect(() => {
    // currentDay가 바뀔 떄 마다 /account GET요청
    const fetchData = async () => {
      const accountByDateData: accountByDateResponse[] | null =
        await getAccountByDate(currentDay);
      if (accountByDateData !== null) {
        setAccountListByDate(accountByDateData);
      }
    };

    fetchData();
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
