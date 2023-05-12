import React from "react";
import Button from "../../../components/Button";
import { BiDownload } from "react-icons/bi";
import StatisticData from "./components/StatisticData";
import GovernementAffairs from "./components/GovernementAffairs";

const InovationStatistic = () => {
  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Statistik Inovasi</div>
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="w-40 float-right">
            <Button
              text="Unduh semua"
              icon={<BiDownload size="16" />}
              padding="p-[10px]"
            />
          </div>
        </div>
        <StatisticData />
        <GovernementAffairs />
      </div>
    </div>
  );
};

export default InovationStatistic;
