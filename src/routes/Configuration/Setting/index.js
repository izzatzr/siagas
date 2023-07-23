import React from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { useQuery } from "react-query";
import { GET_ALL_SETTING } from "../../../constans/constans";
import { getAllSetting } from "../../../services/Configuration/setting";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import TableAction from "../../../components/TableAction";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const Setting = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);

  const navigate = useNavigate();

  const tableHeader = [
    {
      key: "key",
      title: "Konfigurasi",
    },
    {
      key: "value",
      title: "Nilai",
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
    [GET_ALL_SETTING, filterParams],
    getAllSetting(filterParams)
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
        title="Setting"
        linkButton="/konfigurasi/setting"
        linkButtonText="Tambah Setting"
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

export default Setting;
