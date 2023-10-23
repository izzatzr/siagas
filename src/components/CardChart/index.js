import React from "react";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

import { BiDownload } from "react-icons/bi";

const CardChart = ({ label, labels, data }) => {
  const dataChart = {
    labels,
    options: {
      legend: {
        display: false,
      },
    },
    datasets: [
      {
        label: "Total Keseluruhan",
        data,
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
      <div className="flex items-center justify-center w-full">
        <div className="w-[200px] min-h-[200px] box-border relative">
          {data?.length > 0 ? (
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
          ) : (
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap">
              <span> Tidak ada data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardChart;
