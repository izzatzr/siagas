import React from "react";

const ProgressBar = (props) => {
  const { label, total, completed, filledValue } = props;
  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center text-[#333333] mb-2">
        <span>{label}</span>
        <span>{total}</span>
      </div>
      <div className="w-full rounded-full overflow-hidden bg-[#F2F2F2] min-h-[12px]">
        <div className={`min-h-[12px] bg-[#2F80ED] text-white text-center`} style={{width : `${completed}%`}}>
          <span>{filledValue}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
