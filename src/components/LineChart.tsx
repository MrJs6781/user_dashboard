// src/components/ComboChart.tsx

import React from "react";
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
import { Bar } from "react-chartjs-2";

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

interface ComboChartProps {
  labels: string[];
  data: { download: number[]; upload: number[] };
}

const ComboChart: React.FC<ComboChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "دانلود",
        data: data.download,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: "آپلود",
        data: data.upload,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            family: "vazir_b, sans-serif", // Apply font family
          },
        },
      },
      title: {
        display: true,
        text: "ترکیب نمودار دانلود و آپلود",
        font: {
          size: 16,
          family: "vazir_b, sans-serif", // Apply font family
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            const convertedValue = convertToFarsi(value);
            return `${label}: ${convertedValue}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "vazir_b, sans-serif", // Apply font family
          },
        },
      },
      x: {
        ticks: {
          font: {
            family: "vazir_b, sans-serif", // Apply font family
          },
        },
      },
    },
  };

  const convertToFarsi = (value: number): string => {
    if (value >= 1024 * 1024) {
      return `${(value / (1024 * 1024)).toFixed(2)} گیگابایت`;
    } else if (value >= 1024) {
      return `${(value / 1024).toFixed(2)} مگابایت`;
    } else {
      return `${value.toFixed(2)} کیلوبایت`;
    }
  };

  return (
    <div style={{ width: "95%", minHeight: "450px" }}>
      <Bar data={chartData as any} options={options} />
    </div>
  );
};

export default ComboChart;
