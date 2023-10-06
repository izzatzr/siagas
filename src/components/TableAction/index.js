import React from "react";
import { actionTable } from "../../utils";

const TableAction = (props) => {
  const { data, itemData } = props;
  return (
    <td className="max-w-fit">
      <div className="flex items-center gap-3">
        {data.map((item, index) =>
          item?.show === false ? null : (
            <div
              className="cursor-pointer relative group flex justify-center"
              key={index}
              onClick={() => item.onClick(itemData)}
            >
              {actionTable(item.code)}
              {item?.label && (
                <>
                  <div className="hidden group-hover:block w-2 h-2 rotate-45 -top-[18px] bg-gray-700 absolute"></div>
                  <div className="hidden group-hover:block absolute whitespace-nowrap bg-gray-700 -top-10 px-3 py-1 rounded-md text-white">
                    {item?.label}
                  </div>
                </>
              )}
            </div>
          )
        )}
      </div>
    </td>
  );
};

export default TableAction;
