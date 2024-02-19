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
          <AmountNumber textType="in">{inOutValues[0]}원</AmountNumber>
        </InOutDataBox>
        <InOutDataBox>
          <AmountNumber textType="text">지출</AmountNumber>
          <AmountNumber textType="out">{inOutValues[1]}원</AmountNumber>
        </InOutDataBox>
      </DataContainer>
      <DataContainer>
        {/* map으로 처리 가능하다면 추후에 */}
        <CategoryContainer>
          <CategoryItem>
            <div>식비</div>
            <div style={{ color: "#A585FF", fontWeight: "bold" }}>
              {outputs.식비 ?? 0}원
            </div>
          </CategoryItem>
          <CategoryItem>
            <div>카페 </div>
            <div style={{ color: "#FFEB80", fontWeight: "bold" }}>
              {outputs.카페 ?? 0}원
            </div>
          </CategoryItem>
          <CategoryItem>
            <div>생활 </div>
            <div style={{ color: "#FBA76A", fontWeight: "bold" }}>
              {outputs.생활 ?? 0}원
            </div>
          </CategoryItem>
          <CategoryItem>
            <div>교통</div>
            <div style={{ color: "#DEFF97", fontWeight: "bold" }}>
              {outputs.교통 ?? 0}원
            </div>
          </CategoryItem>
          <CategoryItem>
            <div>기타</div>
            <div style={{ color: "#FF96E2", fontWeight: "bold" }}>
              {outputs.기타 ?? 0}원
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
  grid-template-columns: 25rem 25rem;
  grid-template-rows: 25rem 10rem;
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
