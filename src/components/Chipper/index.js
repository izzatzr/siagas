import React from "react";

const Chipper = (props) => {
  const { active, label, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`px-6 py-2 rounded-lg border border-[#069DD9] font-bold cursor-pointer 
    ${active ? "bg-[#EAF9FF] text-[#069DD9]" : "bg-white text-[#333333]"}
  `}
    >
      {label}
    </div>
  );
};

export default Chipper;
