import React from "react";
import manualBook from "../../../assets/manual-book.pdf";
import { BiDownload } from "react-icons/bi";

const Guide = ({ title }) => {
  return (
    <div className="w-full p-8 mt-8 bg-white rounded-lg">
      <div className="px-8 py-4 bg-white rounded">
        <div className="flex items-center justify-between">
          <div className="flex flex-col max-w-4xl gap-1">
            <span className="text-sm text-[#333333] font-light"></span>
            <span className="text-base text-[#333333] font-bold">{title}</span>
          </div>
          <a href={"https://drive.google.com/drive/folders/1aVcDkt_yvE8Y6ySqyEWiAcEdiVfijUCi"} target="_blank" className="flex items-center gap-2">
            <BiDownload color="#2F80ED" size={20} />
            <span className="text-sm text-[#2F80ED]">Unduh Dokumen</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Guide;
