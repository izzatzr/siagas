import React from "react";

const TextInput = (props) => {
  const { label, name, icon, placeholder, type = "text" } = props;
  return (
    <div className="flex gap-2 flex-col">
      {label && (
        <label htmlFor={name} className="text-[#333333] text-base font-normal">
          {label}
        </label>
      )}
      <div
        className={`group flex gap-[10px] rounded-lg border border-[#828282] p-3 bg-white ${
          icon ? "justify-between" : ""
        }`}
      >
        <input
          type={type}
          className="outline-none text-[#333333] placeholder:text-[#828282] text-sm w-full"
          placeholder={placeholder}
        />

        <div className="">{icon}</div>
      </div>
    </div>
  );
};

export default TextInput;
