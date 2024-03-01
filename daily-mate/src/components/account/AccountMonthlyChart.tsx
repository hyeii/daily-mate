import { useEffect, useState } from "react";
import { CategoryByMonthMap } from "../../types/accountType";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import styled from "styled-components";
import { AmountNumber } from "../common/CommonStyledComponents";

interface props {
  outputs: CategoryByMonthMap;
  inOutValues: number[];
}

const extractCategoryValue = (object: CategoryByMonthMap): number[] => {
  const categories: (keyof CategoryByMonthMap)[] = [
    "식비",
    "카페",
    "생활",
    "교통",
    "기타",
  ];
  return categories.map((category) => Math.abs(object[category] || 0));
};

const AccountMonthlyChart = ({ outputs, inOutValues }: props) => {
  const [outputValue, setOutputValue] = useState<number[]>([]);

  useEffect(() => {
    setOutputValue(extractCategoryValue(outputs));
  }, [outputs]);
  return (
    <MonthlyChartWrapper>
      <ChartContainer>
        <DoughnutChart inOutValue={inOutValues} />
      </ChartContainer>
      <ChartContainer>
        <BarChart outputValue={outputValue} />
      </ChartContainer>
      <DataContainer>
        <InOutDataBox>
          <AmountNumber textType="text">수입</AmountNumber>
          <AmountNumber textType="in">
            {inOutValues[0].toLocaleString()}원
          </AmountNumber>
        </InOutDataBox>
        <InOutDataBox>
          <AmountNumber textType="text">지출</AmountNumber>
          <AmountNumber textType="out">
            {inOutValues[1].toLocaleString()}원
          </AmountNumber>
        </InOutDataBox>
      </DataContainer>
      <DataContainer>
        {/* map으로 처리 가능하다면 추후에 */}
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
              {outputs.식비 ? outputs.식비.toLocaleString() : 0}원
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
              {outputs.카페 ? outputs.카페.toLocaleString() : 0}원
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
              {outputs.생활 ? outputs.생활.toLocaleString() : 0}원
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
              {outputs.교통 ? outputs.교통.toLocaleString() : 0}원
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
              {outputs.기타 ? outputs.기타.toLocaleString() : 0}원
            </div>
          </CategoryItem>
        </CategoryContainer>
      </DataContainer>
    </MonthlyChartWrapper>
  );
};

export default AccountMonthlyChart;

const MonthlyChartWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 2rem;
`;

const ChartContainer = styled.div`
  &:nth-child(1) {
    grid-column: 1;
    grid-row: 1;
  }
  &:nth-child(2) {
    grid-column: 2;
    grid-row: 1;
    align-items: center;
    display: flex;
  }

  background-color: #ffffff;
  border-radius: 10px;
`;

const DataContainer = styled.div`
  &:nth-child(1) {
    grid-column: 1;
    grid-row: 2;
  }
  &:nth-child(2) {
    grid-column: 2;
    grid-row: 2;
    align-items: center;
  }

  background-color: #ffffff;
  padding: 0.7rem;
  border-radius: 10px;
`;

const InOutDataBox = styled.div`
  display: flex;
  justify-content: space-between;
  // margin: 0.3rem 1rem;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;
