import React from "react";
import { actionTable } from "../../utils";

const TableAction = (props) => {
  const { data, itemData } = props;
  return (
    <td>
      <div className="flex items-center gap-3">
        {data.map((item, index) => (
          <div className="cursor-pointer" key={index} onClick={() => item.onClick(itemData)}>
            {actionTable(item.code)}
          </div>
        ))}
      </div>
    </td>
  );
};

export default TableAction;
