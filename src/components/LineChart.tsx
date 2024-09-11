// src/components/ComboChart.tsx

import React, { useEffect, useState } from "react";
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
  LineController,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ComboChartProps {
  labels: string[];
  data: { download: number[]; upload: number[]; total: number[] };
}

const ComboChart: React.FC<ComboChartProps> = ({ labels, data }) => {
  const { t } = useTranslation();
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: t("Total"),
        data: data.total,
        backgroundColor: "rgba(50, 80, 180, 0.2)",
        borderColor: "rgba(50, 80, 180, 1)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: t("Download"),
        data: data.download,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: t("Upload"),
        data: data.upload,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
            family : languageID == "1" ? "vazir_b" : "roboto_b"
          },
        },
      },
      title: {
        display: true,
        text: t("YourConsumptionChart"),
        font: {
          size: 16,
          family : languageID == "1" ? "vazir_b" : "roboto_b"
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
        bodyFont: {
          family: languageID == "1" ? "vazir_b" : "roboto_b",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family : languageID == "1" ? "vazir_b" : "roboto_b"
          },
        },
      },
      x: {
        ticks: {
          font: {
            family : languageID == "1" ? "vazir_b" : "roboto_b"
          },
        },
      },
    },
  };

  const convertToFarsi = (value: number): string => {
    if (value >= 1024 * 1024) {
      return `${(value / (1024 * 1024)).toFixed(2)} ${t("GB")}`;
    } else if (value >= 1024) {
      return `${(value / 1024).toFixed(2)} ${t("MB")}`;
    } else {
      return `${value.toFixed(2)} ${t("KB")}`;
    }
  };

  return (
    <div style={{ width: "95%", minHeight: "450px" }}>
      <Bar data={chartData as any} options={options} />
    </div>
  );
};

export default ComboChart;
