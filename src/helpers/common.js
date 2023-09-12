export const diffDate = (date) => {
  const currentDate = new Date();
  const deadline = new Date(date);

  const diffTime = Math.ceil(deadline - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
};

export const setBgColorByDiffDate = (value) => {
  const diffDate = parseInt(value);

  if (diffDate > 15) {
    return "bg-[#05FF00]";
  } else if (diffDate >= 6 && diffDate <= 15) {
    return "bg-[#FAFF00]";
  } else if (diffDate >= 1 && diffDate < 6) {
    return "bg-[#FF0000]";
  } else {
    return "bg-white";
  }
};
