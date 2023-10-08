import React, { useEffect, useState } from "react";

const CustomRadioButton = ({ items, onChange, value }) => {
  const [selectedItem, setSelectedItem] = useState(value);

  const handleRadioChange = (item) => {
    onChange(item);
    setSelectedItem(item);
  };

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  return (
    <div className="flex gap-2">
      {items.map((item, index) => (
        <label
          key={index}
          className="flex items-center p-3 space-x-2 border border-gray-200 rounded-sm"
        >
          <input
            type="radio"
            value={item}
            checked={selectedItem === item}
            onChange={() => handleRadioChange(item)}
          />
          <span className="font-semibold">{item}</span>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;
