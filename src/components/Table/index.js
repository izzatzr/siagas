import React from "react";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";

const Table = (props) => {
  const {
    data,
    columns,
    showNum,
    action,
    ranking = false,
    width = "w-full",
    align,
    footer,
  } = props;
  return (
    <table className={`table ${width && width}`}>
      <thead className="text-left">
        <TableHeader columns={columns} showNum={showNum} ranking={ranking} />
      </thead>
      <tbody>
        {data?.length > 0 ? (
          <TableRow
            data={data}
            columns={columns}
            showNum={showNum}
            action={action}
            align={align}
          />
        ) : (
          <tr className="border-b border-[#F3F6FF]">
            <td
              colSpan={showNum ? columns.length + 1 : columns.length}
              className="text-center text-sm py-3"
            >
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
      {footer && (
        <tfoot>
          <tr className="text-[#333333] px-4">
            {footer.map((foot, index) => (
              <td
                key={index}
                className={`text-[13px] px-4 py-3 font-bold`}
                colSpan={foot?.colSpan || 1}
              >
                {foot?.value}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default Table;
