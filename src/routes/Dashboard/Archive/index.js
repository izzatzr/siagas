import React from "react";
import FilterArsip from "./components/FilterArsip";
import TablePemda from "./components/TablePemda";

const Archive = () => {
  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Arsip</div>
      <div className="flex flex-col gap-6"></div>
      <FilterArsip />
      <TablePemda />
    </div>
  );
};

export default Archive;
