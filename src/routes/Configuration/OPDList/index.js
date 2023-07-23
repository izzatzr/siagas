import React from "react";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { GET_ALL_OPD } from "../../../constans/constans";
import { getAllOPD } from "../../../services/Configuration/opd";
import { useQuery } from "react-query";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const OPDList = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);
  const tableHeader = [
    {
      key: "name",
      title: "Nama OPD",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        alert("Not yet implemented");
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      onClick: (value) => {
        alert("Not yet implemented");
      },
    },
  ];

  const { data } = useQuery(
    [GET_ALL_OPD, filterParams],
    getAllOPD(filterParams)
  );

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <Toolbar
        title="Daftar OPD"
        linkButton="/konfigurasi/opd"
        linkButtonText="Tambah OPD"
        search={true}
        onSearch={(e) => console.log(e.target.value)}
      />

      <div className="w-full rounded-lg bg-white py-4 px-6">
        <Table
          showNum={true}
          data={data?.data || []}
          columns={tableHeader}
        />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default OPDList;
