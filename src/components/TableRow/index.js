import React from "react";
import get from "lodash.get";

const TableRowCell = ({ item, column, action }) => {
  const value = get(item, column.key !== "action" && column.key);

  return column.key !== "action" ? (
    <td
      className={`text-[13px] px-4 py-3 ${
        column.key === "title"
          ? "w-40"
          : column?.width
          ? `w-[${column?.width}]`
          : ""
      }`}
    >
      {column?.render ? column?.render(item) : value !== null ? value : "-"}
    </td>
  ) : (
    action
  );
};

const TableRow = (props) => {
  const { data, columns, showNum, action } = props;
  return (
    <>
      {data.map((item, itemIndex) => (
        <tr
          className="border-b text-[#333333] px-4"
          key={`table-body=${itemIndex}`}
        >
          {showNum && (
            <td className="text-[13px] px-2 py-3">{itemIndex + 1}</td>
          )}
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
              action={action}
            />
          ))}
        </tr>
      ))}
    </>
  );
};

export default TableRow;
