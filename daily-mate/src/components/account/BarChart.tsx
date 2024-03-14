import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface props {
  outputValue: number[];
}
const BarChart = ({ outputValue }: props) => {
  const data = {
    labels: ["식비", "카페", "생활", "교통", "기타"],
    datasets: [
      {
        label: "카테고리별 지출",
        data: outputValue,
        backgroundColor: [
          "#A585FF",
          "#FFEB80",
          "#FBA76A",
          "#DEFF97",
          "#FF96E2",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        display: false,
      },
      y: {
        beginAtZero: true,
        display: false,
      },
    },
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
