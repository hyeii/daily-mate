import { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import { accountByDateResponse } from "../../types/accountType";
import AccountHistory from "./AccountHistory";
import { getAccountByDate } from "../../apis/accountApi";
import BarChart from "./BarChart";
import styled from "styled-components";
import { formatDate } from "../common/FormatDate";

interface props {
  currentDay: string;
}

const AccountDaily = ({ currentDay }: props) => {
  const [accountListByDate, setAccountListByDate] = useState<
    accountByDateResponse[] | null
  >(null);
  const [dailyOutput, setDailyOutput] = useState<number[]>([]);

  useEffect(() => {
    // currentDay가 바뀔 떄 마다 /account GET요청
    const fetchData = async () => {
      const accountByDateData: accountByDateResponse[] | null =
        await getAccountByDate(currentDay);
      if (accountByDateData !== null) {
        setAccountListByDate(accountByDateData);
        const cate = ["식비", "카페", "생활", "교통", "기타"];

        const dailyOutputResult: number[] = Array(5).fill(0);
        accountByDateData.forEach((account) => {
          const idx = cate.indexOf(account.category);
          if (idx !== -1) {
            // 없는 카테고리일땐 -1 반환해서
            dailyOutputResult[idx] += Math.abs(account.amount);
          }
        });
        setDailyOutput(dailyOutputResult);
      }
    };

    fetchData();
  }, [currentDay]);
  return (
    <AccountDailyWrapper>
      <div>
        <AccountDayBox>{formatDate(currentDay)}의 가계부</AccountDayBox>
      </div>
      <DailytContainer>
        <Calendar isMini="yes" calendarType="account" />
        <ChartContainer>
          <BarChart outputValue={dailyOutput} />
          <CategoryContainer>
            <CategoryItem>
              <div>식비</div>
              <div
                style={{
                  color: "#A585FF",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgba(165,133,255, 1)",
                }}
              >
                {dailyOutput[0]}원
              </div>
            </CategoryItem>
            <CategoryItem>
              <div>카페 </div>
              <div
                style={{
                  color: "#FFEB80",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgba(214,180,10, 0.5)",
                }}
              >
                {dailyOutput[1]}원
              </div>
            </CategoryItem>
            <CategoryItem>
              <div>생활 </div>
              <div
                style={{
                  color: "#FBA76A",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgba(222,135,72, 1)",
                }}
              >
                {dailyOutput[2]}원
              </div>
            </CategoryItem>
            <CategoryItem>
              <div>교통</div>
              <div
                style={{
                  color: "#DEFF97",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgb(139,154,110)",
                }}
              >
                {dailyOutput[3]}원
              </div>
            </CategoryItem>
            <CategoryItem>
              <div>기타</div>
              <div
                style={{
                  color: "#FF96E2",
                  fontWeight: "bold",
                  textShadow: "0 0 4px rgba(219,29,166, 0.5)",
                }}
              >
                {dailyOutput[4]}원
              </div>
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

const AccountDayBox = styled.h2`
  display: inline-block;
  background-color: #ffffff;
  padding: 0.5rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: #3a3a3a;
`;

const DailytContainer = styled.div`
  display: flex;
  min-height: 20rem;
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: 30rem;
  grid-template-rows: 3fr 1fr;
  grid-gap: 0.2rem;

  background-color: #ffffff;
  border-radius: 10px;
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
