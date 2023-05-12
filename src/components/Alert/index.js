import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsFileEarmarkCheckFill } from "react-icons/bs";

const Alert = ({ message, callback, type = "success" }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed z-10 bg-black/20">
      <div className="bg-white rounded-lg w-[344px] h-[344px] flex justify-center items-center flex-col gap-4">
        <div
          className={`rounded-lg p-6 ${
            type === "success" ? "bg-[#E2F8FF]" : "bg-[#FFDADA]"
          }`}
        >
          {type === "success" ? (
            <BsFileEarmarkCheckFill className="w-20 h-20 text-[#069DD9]" />
          ) : (
            <AiFillWarning className="w-20 h-20 text-[#EB5757]" />
          )}
        </div>
        <span className="text-lg font-bold">
          {message || "Berhasil disimpan"}
        </span>
        <div className="mt-2">
          <button
            onClick={callback}
            className="p-3 flex items-center gap-[10px] bg-[#069DD9] text-white rounded-lg font-bold text-sm"
          >
            <BiArrowBack className="" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
