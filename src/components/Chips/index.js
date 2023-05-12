import React from "react";

const Chips = (props) => {
  const { label, color, description } = props;
  return (
    <div className={`flex gap-2 items-center py-2 px-3 text-xs rounded-lg border border-[${color}]`}>
      <div className={`h-3 w-3 rounded-full bg-[${color}]`}></div>
      <span className={`font-bold text-[${color}]`}>{label}</span>
      <span>{`(${description})`}</span>
    </div>
  );
};

export default Chips;
