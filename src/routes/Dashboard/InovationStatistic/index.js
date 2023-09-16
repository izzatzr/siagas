import React from "react";
import Button from "../../../components/Button";
import { BiDownload } from "react-icons/bi";
import StatisticWrapper from "./components/StatisticWrapper";

const InovationStatistic = () => {
  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Statistik Inovasi</div>
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="float-right w-40">
            <Button
              text="Unduh semua"
              icon={<BiDownload size="16" />}
              padding="p-[10px]"
            />
          </div>
        </div>
        <StatisticWrapper />
      </div>
    </div>
  );
};

export default InovationStatistic;
