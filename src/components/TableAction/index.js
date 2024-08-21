import React, { useEffect, useRef, useState } from 'react';
import { actionTable } from '../../utils';

const TableAction = (props) => {
  const { data, itemData } = props;
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <td className="max-w-fit">
      <div className="flex items-center gap-3">
        {data.map((item, index) =>
          item?.show === false ? null : (
            <div
              className="relative flex justify-center cursor-pointer group"
              key={index}
              ref={dropdownIndex === index ? dropdownRef : null}
              onClick={() =>
                item.contextMenu
                  ? toggleDropdown(index)
                  : item.onClick(itemData)
              }
            >
              {actionTable(item.code)}
              {item?.label && (
                <>
                  <div className="hidden group-hover:block w-2 h-2 rotate-45 -top-[18px] bg-gray-700 absolute"></div>
                  <div className="absolute hidden px-3 py-1 text-white bg-gray-700 rounded-md group-hover:block whitespace-nowrap -top-10">
                    {item?.label}
                  </div>
                </>
              )}
              {/* Conditional Dropdown Menu */}
              {item.contextMenu && dropdownIndex === index && (
                <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                  {item.contextMenu(itemData).map((menuItem, menuIndex) => (
                    <a
                      key={menuIndex}
                      href={menuItem.link}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        window.open(menuItem.link, '_blank'); // Open in new tab
                      }}
                    >
                      {menuItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </td>
  );
};

export default TableAction;
