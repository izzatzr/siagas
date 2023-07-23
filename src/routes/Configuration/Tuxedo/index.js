import React from "react";
import { useNavigate } from "react-router-dom";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { useQuery } from "react-query";
import { GET_ALL_TUXEDO } from "../../../constans/constans";
import { getAllTuxedo } from "../../../services/Configuration/tuxedo";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const Tuxedo = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);

  const navigate = useNavigate();

  const tableHeader = [
    {
      key: "title",
      title: "Judul",
    },
    {
      key: "slug",
      title: "Slug",
    },
    {
      key: "section",
      title: "Section",
    },
    {
      key: "username",
      title: "Username",
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

  const { data: userData } = useQuery(
    [GET_ALL_TUXEDO, filterParams],
    getAllTuxedo(filterParams)
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
        title="Tuxedo"
        linkButton="/konfigurasi/tuxedo"
        linkButtonText="Tambah Tuxedo"
        search={true}
        onSearch={(e) => console.log(e.target.value)}
      />

      <div className="w-full rounded-lg bg-white py-4 px-6">
        <Table
          showNum={true}
          data={userData?.data || []}
          columns={tableHeader}
        />
        <Pagination
          pageCount={userData?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={userData?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default Tuxedo;
