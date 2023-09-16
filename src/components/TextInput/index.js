import React from "react";

const TextInput = (props) => {
  const {
    label,
    name,
    icon,
    placeholder,
    type = "text",
    onChange,
    value,
    clickIcon,
    errorMessage,
    required = false,
  } = props;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-[#333333] text-sm font-normal">
          {required && <span className="mr-1 text-red-600">*</span>}
          {label}
        </label>
      )}
      <div
        className={`group flex gap-[10px] rounded-lg border border-[#828282] ${
          errorMessage && "border-[red]"
        } px-3 py-2 bg-white ${icon ? "justify-between" : ""}`}
      >
        <input
          type={type}
          className="outline-none text-[#333333] placeholder:text-[#828282] text-sm w-full"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />

        <div className="cursor-pointer" onClick={clickIcon}>
          {icon}
        </div>
      </div>
      <span className="text-xs text-red-600">{errorMessage}</span>
    </div>
  );
};

export default TextInput;
