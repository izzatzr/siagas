import React from "react";
import { BiDownload } from "react-icons/bi";
import Button from "../../../../../components/Button";

const FilterArsip = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span>Filter</span>
        <div className="bg-[#069DD9] border border-[#069DD9] rounded-lg py-2 px-6 text-white">
          Semua
        </div>
        <div className="bg-white border border-[#069DD9] rounded-lg py-2 px-6 text-[#333333]">
          Inisiatif
        </div>
        <div className="bg-white border border-[#069DD9] rounded-lg py-2 px-6 text-[#333333]">
          Uji Coba
        </div>
        <div className="bg-white border border-[#069DD9] rounded-lg py-2 px-6 text-[#333333]">
          Penerapan
        </div>
      </div>
      <div className="">
      <Button
        text="Unduh Data (XLS)"
        icon={<BiDownload size="16" />}
        padding="p-[10px]"
      />
      </div>
    </div>
  );
};

export default FilterArsip;
