import React from "react";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

const SelectOption = (props) => {
  const {
    label,
    placeholder,
    options,
    onChange,
    value,
    paginate = false,
  } = props;
  console.log(value);
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="" className="text-xs text-[#333333]">
        {label}
      </label>
      {paginate ? (
        <AsyncPaginate
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: "none",
              borderColor: "#333333",
              padding: "4px",
              borderRadius: "0.5rem",
              border: "1px solid #828282",
            }),
            placeholder: (defaultStyles) => {
              return {
                ...defaultStyles,
                fontSize: "14px",
              };
            },
          }}
          value={value}
          loadOptions={options}
          onChange={onChange}
          additional={{
            page: 1,
          }}
          getOptionLabel={(value) => value.name || value.value}
          placeholder={placeholder}
        />
        
      ) : (
        <Select
          value={value}
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: "none",
              borderColor: "#333333",
              padding: "4px",
              borderRadius: "0.5rem",
              border: "1px solid #828282",
            }),
            placeholder: (defaultStyles) => {
              return {
                ...defaultStyles,
                fontSize: "14px",
              };
            },
          }}
          placeholder={placeholder || "Select..."}
          options={options}
          onChange={(value) => onChange(value)}
          getOptionLabel={(value) => value.name || value.label}
        />
      )}
    </div>
  );
};

export default SelectOption;
