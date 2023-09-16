import React from "react";
import get from "lodash.get";
import parser from "html-react-parser";

const TableRowCell = ({ item, column, action }) => {
  const value = get(item, column.key !== "action" && column.key);

  if (column.key === "action") {
    return action;
  }

  const cellClass = `text-[13px] px-2 py-3 ${
    column.key === "title" ? "w-40" : ""
  }`;

  let cellContent = value;

  if (column.parser === "html") {
    cellContent = parser(value);
  } else if (column.render) {
    cellContent = column.render(item);
  }

  return <td className={cellClass}>{cellContent}</td>;
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
