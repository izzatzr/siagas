import React from "react";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

import { BiDownload } from "react-icons/bi";

const CardChart = (props) => {
  const { label } = props;

  const dataChart = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    options: {
      legend: {
        display: false,
      },
    },
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
  };
  return (
    <div className="w-full flex flex-col gap-4 rounded-lg border border-[#E0E0E0] p-6">
      <div className="flex items-center justify-between">
        <span className="text-base text-[#333333] font-bold">{label}</span>
        <div className="flex items-center gap-2">
          <BiDownload color="#2F80ED" size={20} />
          <span className="text-sm text-[#2F80ED]">Simpan</span>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[200px]">
          <Doughnut
            data={dataChart}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardChart;
