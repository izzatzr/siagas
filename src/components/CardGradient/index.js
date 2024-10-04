import React from "react";
import { RiInformationFill } from "react-icons/ri";

const CardGradient = (props) => {
  const { label, total, showInfo, showInfoLabel } = props;
  const startGradient = '#063a69'
  const endGradient = '#5BC2EB'
  return (
    <div
      className={`w-full flex flex-col gap-1 text-white rounded-lg px-6 py-4`}
      style={{
        background: `linear-gradient(to right,${startGradient}, ${endGradient})`
      }}
    >
      <div>{showInfo && <RiInformationFill className="float-right" />}</div>
      <div className="flex items-center justify-between">
        <span className="text-[#F2F2F2] text-base">{label}</span>
        {showInfoLabel && (
          <span className="text-base font-bold float-right">
            {showInfoLabel}
          </span>
        )}
      </div>

      <span className="text-xl font-medium">{total}</span>
    </div>
  );
};

export default CardGradient;
