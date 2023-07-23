import React from "react";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { GET_ALL_UPDT } from "../../../constans/constans";
import { useQuery } from "react-query";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { getAllUPTD } from "../../../services/Configuration/updt";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const UPTDList = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);
  const tableHeader = [
    {
      key: "regionalApparatus.name",
      title: "OPD",
    },
    {
      key : 'name',
      title : "Nama UPDT"
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
    [GET_ALL_UPDT, filterParams],
    getAllUPTD(filterParams)
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
        title="Daftar UPDT"
        linkButton="/konfigurasi/updt"
        linkButtonText="Tambah UPTD"
        search={true}
        onSearch={(e) => console.log(e.target.value)}
      />

      <div className="w-full rounded-lg bg-white py-4 px-6">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
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

export default UPTDList;
