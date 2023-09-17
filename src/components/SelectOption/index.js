import React from "react";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

const SelectOption = (props) => {
  const {
    label,
    getOptionLabel,
    placeholder,
    options,
    onChange,
    value,
    paginate = false,
    errorMessage,
    required = false,
  } = props;
  return (
    <div className="relative flex flex-col w-full gap-1">
      <label htmlFor="" className="text-xs text-[#333333] mb-2">
        {required && <span className="mr-1 text-red-600">*</span>}
        {label}
      </label>
      {paginate ? (
        <AsyncPaginate
          key={JSON.stringify(value)}
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "none",
              borderRadius: "0.5rem",
              border: `1px solid ${errorMessage ? "red" : "#828282"}`,
            }),
            placeholder: (defaultStyles) => {
              return {
                ...defaultStyles,
                fontSize: "14px",
              };
            },
          }}
          value={value || ""}
          loadOptions={options}
          onChange={onChange}
          additional={{
            page: 1,
          }}
          isMulti={false}
          getOptionValue={(value) => value.name || value.value}
          getOptionLabel={(value) =>
            getOptionLabel ? getOptionLabel(value) : value.name || value.value
          }
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
              borderRadius: "0.5rem",
              border: `1px solid ${errorMessage ? "red" : "#828282"}`,
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
      <span className="absolute text-xs text-red-600 -bottom-4">
        {errorMessage}
      </span>
    </div>
  );
};

export default SelectOption;
