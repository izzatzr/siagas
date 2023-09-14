import React from "react";

const TableHeader = (props) => {
  const { columns, showNum, ranking } = props;
  return (
    <tr className="border-b border-[#F3F6FF] px-4">
      {showNum &&
        (ranking ? (
          <th className="text-[13px] text-[#717171] font-medium py-3 px-2">
            Rkg
          </th>
        ) : (
          <th className="text-[13px] text-[#717171] font-medium py-3 px-3">
            #
          </th>
        ))}
      {columns.map((column, index) => (
        <th
          className="text-[13px] text-[#717171] font-medium py-3 px-2"
          key={index}
          style={{
            width: column?.width ? column?.width : "auto",
          }}
        >
          {column.title}
        </th>
      ))}
    </tr>
  );
};

export default TableHeader;
