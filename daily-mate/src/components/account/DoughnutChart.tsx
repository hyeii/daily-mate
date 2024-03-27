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
        backgroundColor: ["#75aefe", "#f18282"],
      },
    ],
  };
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
