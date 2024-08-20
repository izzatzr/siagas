import React from 'react';
import { twMerge } from 'tailwind-merge';

const TextInput = (props) => {
  const {
    className,
    label,
    name,
    icon,
    placeholder,
    type = 'text',
    onChange,
    value,
    clickIcon,
    errorMessage,
    disabled,
    required = false,
  } = props;

  return (
    <div
      className={twMerge('flex gap-2 flex-col relative -mt-[7px]', className)}
    >
      {label && (
        <label htmlFor={name} className="text-[#333333] text-sm font-normal">
          {required && <span className="mr-1 text-red-600">*</span>}
          {label}
        </label>
      )}
      <div
        className={`group flex gap-[10px] rounded-lg border border-[#828282] ${
          errorMessage && 'border-[red]'
        } p-3 bg-white ${icon ? 'justify-between' : ''} ${
          disabled && 'pointer-events-none bg-[#3b3b3b]/10'
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
      <span className="absolute text-xs text-red-600 -bottom-4">
        {errorMessage}
      </span>
    </div>
  );
};

export default TextInput;
