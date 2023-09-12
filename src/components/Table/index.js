import React from "react";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";

const Table = (props) => {
  const { data, columns, showNum, action, ranking = false, width = 'w-full' } = props;
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
          />
        ) : (
          <tr>
            <td
              colSpan={showNum ? columns.length + 1 : columns.length}
              className="text-center text-sm"
            >
              Tidak ada data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
