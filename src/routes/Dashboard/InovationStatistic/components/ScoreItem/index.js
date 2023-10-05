import React from "react";

const ScoreItem = ({ value }) => {
  let color = "";

  if (value >= 81) {
    color = "bg-[#27AE60]";
  } else if (value >= 41 && value <= 80) {
    color = "bg-[#F2C94C]";
  } else {
    color = "bg-[#EB5757]";
  }

  return (
    <div className={`w-full text-center py-4 text-white ${color}`}>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
};

export default ScoreItem;
