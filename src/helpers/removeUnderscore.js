export const removeUnderscore = (inputString) => {
  return inputString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
