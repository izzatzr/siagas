import React from "react";

const Button = ({
  text,
  icon,
  onClick,
  padding = "px-6 py-[8px]",
  fontSize,
  background = "#063a69",
  fontColor = "#fff",
  border,
  disabled,
}) => {
  const buttonClasses = `flex items-center gap-2 justify-center rounded-lg disabled:cursor-not-allowed ${padding} ${fontSize} ${border}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#d1e5ed" : background,
        color: fontColor,
      }}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
