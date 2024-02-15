import { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import { accountByDateResponse } from "../../types/accountType";
import AccountHistory from "./AccountHistory";
import { getAccountByDate } from "../../apis/accountApi";
import BarChart from "./BarChart";
import styled from "styled-components";

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
  }, [accountListByDate, currentDay]);
  return (
    <AccountDailyWrapper>
      <DailytContainer>
        <Calendar isMini="yes" calendarType="account" />
        <ChartContainer>
          <BarChart outputValue={dailyOutput} />
          <CategoryContainer>
            <CategoryItem>
              <div>식비</div>
              <div>{dailyOutput[0]}원</div>
            </CategoryItem>
            <CategoryItem>
              <div>카페 </div>
              <div>{dailyOutput[1]}원</div>
            </CategoryItem>
            <CategoryItem>
              <div>생활 </div>
              <div>{dailyOutput[2]}원</div>
            </CategoryItem>
            <CategoryItem>
              <div>교통</div>
              <div>{dailyOutput[3]}원</div>
            </CategoryItem>
            <CategoryItem>
              <div>기타</div>
              <div>{dailyOutput[4]}원</div>
            </CategoryItem>
          </CategoryContainer>
        </ChartContainer>
      </DailytContainer>
      <AccountHistory accountList={accountListByDate} />
    </AccountDailyWrapper>
  );
};

export default AccountDaily;

const AccountDailyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DailytContainer = styled.div`
  display: flex;
  height: 20rem;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 30rem;
  grid-template-rows: 3fr 1fr;
  grid-gap: 0.2rem;

  border: 1px solid #e8e8e8;
  border-radius: 5px;
  margin-left: 0.5rem;
  padding: 0.3rem 0;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0.3rem;
  grid-column-gap: 0.7rem;
  padding: 0.3rem;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;
