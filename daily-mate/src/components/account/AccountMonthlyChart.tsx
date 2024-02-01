import { useEffect, useState } from "react";
import { CategoryByMonthMap } from "../../types/accountType";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

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
  return categories.map((category) => object[category] || 0);
};

const AccountMonthlyChart = ({ outputs, inOutValues }: props) => {
  const [outputValue, setOutputValue] = useState<number[]>([]);

  useEffect(() => {
    setOutputValue(extractCategoryValue(outputs));
  }, [outputs]);
  return (
    <div>
      <div>
        <DoughnutChart inOutValue={inOutValues} />
        <BarChart outputValue={outputValue} />
      </div>
      <div>
        <div>수입 : {inOutValues[0]}</div>
        <div>지출 : {inOutValues[1]}</div>
      </div>
      <div>
        {/* map으로 처리 가능하다면 추후에 */}
        <div>식비 : {outputs.식비 ?? 0}원</div>
        <div>카페 : {outputs.카페 ?? 0}원</div>
        <div>생활 : {outputs.생활 ?? 0}원</div>
        <div>교통 : {outputs.교통 ?? 0}원</div>
        <div>기타 : {outputs.기타 ?? 0}원</div>
      </div>
    </div>
  );
};

export default AccountMonthlyChart;
