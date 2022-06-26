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
import "../Home.scss";
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
      color : 'var(--font-color)'
    },
    title: {
      display: true,
      text: "Évènements créés par semaine",
    },
  },
};
const labels = ["Y22W21", "Y22W22", "Y22W23", "Y22W24"];
const dataset = {
  labels: labels,
  data: labels.map(() => faker.datatype.number({ min: 0, max: 70 })),
  color : "red"
};
export const data = {
  labels: dataset.labels,
  datasets: [
    {
      label: "Évènements créés",
      data: dataset.data,
      borderColor: "#3750ff",
      backgroundColor: "#3750ff",
    },
  ],
};

export function Chart() {
  return (
    <div className="chart__container__dashboard">
      <div className="chart__container__dashboard__chart">
        <Line options={options} data={data} width={300} />
      </div>
      <div className="chart__container__dashboard__data">
        {data.labels.map((label, i) => (
          <div key={label} className="chart__container__dashboard__data__item">
            <p>{label}</p>
            <h2>{dataset.data[i]}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
