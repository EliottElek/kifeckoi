import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieSelector = ({ events, selector, title }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let labels = [];
    let values = [];
    events?.forEach((item) => {
      const index = labels.findIndex((l) => l === item[selector]);
      if (index === -1) {
        labels.push(item[selector]);
        values.push(1);
      } else {
        values[index]++;
      }
    });
    setData({
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [events, setData, selector]);
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      render: "percentage",
      fontColor: ["green", "white", "red"],
      precision: 2,
      text: "23%",
      datalabels: {
        // display: false,
        color: "black",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
  };
  if (!data || data.labels.length === 0)
    return (
      <div style={{ position: "relative" }}>
        <h4 style={{ fontStyle: "italic" }}>Aucun évènement.</h4>
      </div>
    );

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "240px",
        textAlign: "center",
        padding: "8px",
      }}
    >
      <h5
        style={{
          padding: "8px",
        }}
      >
        {title}
      </h5>
      <Pie options={options} data={data} />
    </div>
  );
};
export default PieSelector;
