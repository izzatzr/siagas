import React from "react";
import { ImStack } from "react-icons/im";

const InnovationItem = ({ label, value }) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-48 h-32 text-lg font-bold border border-gray-400 rounded-md">
      <h2 className="leading-loose">{label}</h2>
      <h3>{value}</h3>

      <div className="absolute bottom-3 right-3 ">
        <ImStack size={20} color="#9ca3af" />
      </div>
    </div>
  );
};

export default InnovationItem;
