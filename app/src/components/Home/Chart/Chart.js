import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Évènements créés par semaine",
    },
  },
};

const labels = [
  "Y22W17",
  "Y22W18",
  "Y22W19",
  "Y22W21",
  "Y22W22",
  "Y22W23",
  "Y22W24",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 70 })),
      borderColor: "#3750ff",
      backgroundColor: "#3750ff",
    },
  ],
};

export function Chart() {
  return <Line options={options} data={data} width={400} />;
}
