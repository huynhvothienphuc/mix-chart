import React, { useRef, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { LINE_COLOR, SOLID_COLOR, TYPES_COLOR,numberReviewChartData } from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MixedChart = ({
  labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
}) => {
  const [barColors, setBarColors] = useState(TYPES_COLOR);
  const [data, setData] = useState(null);
  const chartRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    display: false,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    let datasets = [];
    if (numberReviewChartData.solidChart) {
      numberReviewChartData.solidChart.forEach((_, index) => {
        datasets.push({
          type: "line",
          data: _.data,
          label: _.label,
          fill: false,
          backgroundColor: SOLID_COLOR[index].color,
          borderColor: SOLID_COLOR[index].color,
          borderDash: [5, 5],
          yAxisID: "y1",
        });
      });
    }
    if (numberReviewChartData.lineChart) {
      numberReviewChartData.lineChart.forEach((_, index) => {
        datasets.push({
          type: "line",
          data: _.data,
          label: _.label,
          borderColor: LINE_COLOR[index].color,
          borderWidth: 2,
          fill: false,
          yAxisID: "y1",
        });
      });
    }
    if (numberReviewChartData.barChart) {
      numberReviewChartData.barChart.forEach((_, index) => {
        datasets.push({
          label: "Type 1",
          data: _.data,
          backgroundColor: barColors[index].color,
        });
      });
    }
    const chartData = {
      labels: labels,
      datasets: datasets,
    };
    setData(chartData);
  }, [
    barColors,
    numberReviewChartData.barChart,
    numberReviewChartData.lineChart,
    numberReviewChartData.solidChart,
    labels,
  ]);

  const options = {
    scales: {
      y: {
        stacked: true,
        min: 0,
        max: 190,
      },
      y1: {
        position: "right",
        stacked: false,
        min: 0,
        max: 10,
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: (context) => {
          const { chart, tooltip } = context;
          if (tooltip.opacity === 0) {
            setTooltip({ display: false, top: 0, left: 0 });
            return;
          }
          const position = chart.canvas.getBoundingClientRect();
          const gap = position.width > 1200 ? 180 : 130;
          const windowW = window.innerWidth - 250;
          const result =
            position.right - tooltip.caretX - windowW / 2 - 200;
          setTooltip({
            display: true,
            top: tooltip.caretY,
            left:
              result > 0
                ? tooltip.caretX + gap
                : tooltip.caretX - gap - 450,
          });
        },
      },
    },
  };

  return (
    <>
      {data && (
        <>
          <Chart
            data={data}
            options={options}
            ref={chartRef}
            type={"bar"}
          />
        </>
      )}
    </>
  );
};

export default MixedChart;
