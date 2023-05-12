import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed z-10 bg-black/20">
      <AiOutlineLoading size={60} color={"#069DD9"} className="animate-spin" />
    </div>
  );
};

export default Loading;
