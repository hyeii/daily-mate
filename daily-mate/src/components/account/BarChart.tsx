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

export const options = {
  // responsive: true,
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

const labels = ["식비", "카페", "생활", "교통", "기타"];

export const data = {
  labels: labels,
  datasets: [
    {
      label: "카테고리별 지출",
      data: [225000, 124000, 46000, 81000, 56000],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
