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
    errorMessage
  } = props;
  return (
    <div className="w-full flex flex-col gap-1 relative">
      <label htmlFor="" className="text-xs text-[#333333]">
        {label}
      </label>
      {paginate ? (
        <AsyncPaginate
          key={JSON.stringify(value)}
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "none",
              borderColor: "#333333",
              padding: "4px",
              borderRadius: "0.5rem",
              border: `1px solid ${ errorMessage ? "red" : "#828282"}`,
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
              padding: "4px",
              borderRadius: "0.5rem",
              border: `1px solid ${ errorMessage ? "red" : "#828282"}`,
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
      <span className="text-xs text-red-600 absolute -bottom-4">{errorMessage}</span>
    </div>
  );
};

export default SelectOption;
