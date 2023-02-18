import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CardLogin = (props) => {
  const { label, image } = props;
  return (
    <div className="flex items-center bg-[#F2C94C] p-2 gap-2 rounded drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <img src={image} alt="announcement" />
      <span className="font-bold text-[#333333] text-sm">{label}</span>
      <FaChevronRight />
    </div>
  );
};

export default CardLogin;
