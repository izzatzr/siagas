import React from "react";
import { BiDownload,BiCaretDown } from "react-icons/bi";

const DailyLogin = () => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-6">
      <div className="w-full flex justify-between items-center">
        <span className="text-[20px]">Login Perhari</span>
        <div className="flex items-center gap-2">
          <BiDownload color="#2F80ED" size={20} />
          <span className="text-sm text-[#2F80ED]">Unduh Data</span>
          <BiCaretDown />
        </div>
      </div>
      <div className="w-full h-80 border border-[#E0E0E0] rounded-lg flex justify-center items-center">
        UNTUK CHART
      </div>
    </div>
  );
};

export default DailyLogin;
