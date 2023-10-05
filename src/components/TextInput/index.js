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
    required,
    disabled,
  } = props;
  return (
    <div className="flex gap-2 flex-col relative -mt-[7px]">
      {label && (
        <label htmlFor={name} className="text-[#333333] text-sm font-normal">
          {required && <span className="mr-1 text-red-600">*</span>}
          {label}
        </label>
      )}
      <div
        className={`group flex gap-[10px] rounded-lg border border-[#828282] ${
          errorMessage && "border-[red]"
        } p-3 bg-white ${icon ? "justify-between" : ""} ${
          disabled && "pointer-events-none bg-[#3b3b3b]/10"
        }`}
      >
        <input
          type={type}
          className="outline-none text-[#333333] placeholder:text-[#828282] text-sm w-full"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />

        <div className="cursor-pointer" onClick={clickIcon}>
          {icon}
        </div>
      </div>
      <span className="text-xs text-red-600 absolute -bottom-4">{errorMessage}</span>
    </div>
  );
};

export default TextInput;
