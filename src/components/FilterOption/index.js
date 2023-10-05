import React from "react";

const FilterOption = ({ items, defaultValue = "", onFilterChange }) => {
  const [selected, setSelected] = React.useState(defaultValue);

  const onHandleSelected = (item) => {
    setSelected(item);
    onFilterChange(item);
  };

  React.useEffect(() => {
    onFilterChange(selected);
  }, [selected]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {items.map((item) => (
          <div
            key={item.value}
            onClick={() => onHandleSelected(item.value)}
            className={`${
              selected === item.value
                ? "bg-[#069DD9] text-white"
                : "bg-transparent text-[#069DD9]"
            } border border-[#069DD9] rounded-lg py-2 px-6 cursor-pointer transition-colors`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterOption;
