import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface props {
  inOutValue: number[];
}

const DoughnutChart = ({ inOutValue }: props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels: ["수입", "지출"],
    datasets: [
      {
        label: "수입지출",
        data: inOutValue,
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
