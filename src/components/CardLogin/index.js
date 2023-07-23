import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CardLogin = (props) => {
  const { label, image } = props;
  return (
    <div className="flex items-center bg-white p-2 gap-[10px] rounded drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <img src={image} alt="announcement" width={28} height={28} />
      <span className="font-bold text-[#333333] text-sm">{label}</span>
      <FaChevronRight color="#2D9CDB"  />
    </div>
  );
};

export default CardLogin;
