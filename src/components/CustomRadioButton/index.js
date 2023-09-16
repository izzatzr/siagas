import React, { useState } from "react";

const CustomRadioButton = ({ items, onChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioChange = (item) => {
    onChange(item);
    setSelectedItem(item);
  };

  return (
    <div className="flex justify-between">
      {items.map((item) => (
        <label
          key={item}
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
