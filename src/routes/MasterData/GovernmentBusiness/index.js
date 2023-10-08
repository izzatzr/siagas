import React from "react";
import {
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { GET_ALL_GOVERNMENT_BUSINESS } from "../../../constans/constans";
import { EDIT_ACTION_TABLE } from "../../../constants";
import { getAllGovernmentBusiness } from "../../../services/MasterData/GovernmentBusiness";
import Pagination from "../../../components/Pagination";
import { useUtilContexts } from "../../../context/Utils";
import { diffDate, setBgColorByDiffDate } from "../../../helpers/common";

const initialFilter = {
  limit: 20,
  page: 1,
  name: "",
};

const GovernmentBusiness = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      label : "Edit",
      onClick: (value) => {
        navigate(`/master/urusan-pemerintah/edit/${value.id}`);
      },
    },
  ];

  const tableHeader = [
    { key: "name", title: "Nama" },
    {
      key: "",
      title: "Deadline",
      width : 300,
      render: (item) => {
        return (
          <div
            className={`px-3 py-2 ${setBgColorByDiffDate(
              diffDate(item?.deadline)
            )}`}
          >
            {diffDate(item?.deadline)} Hari
          </div>
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data, isFetching } = useQuery(
    [GET_ALL_GOVERNMENT_BUSINESS, filterParams],
    getAllGovernmentBusiness(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleSearch = (e) => {
    let value = e.target.value;

    if (value.length === 0) {
      setFilterParams({
        ...filterParams,
        name: "",
        page: 1,
      });
    }

    if (value.length >= 3) {
      setFilterParams({
        ...filterParams,
        name: e.target.value,
        page: 1,
      });
    }
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">
        Urusan Pemerintah
      </div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/urusan-pemerintah/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Urusan Pemerintah
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Pencarian"
            onChange={onHandleSearch}
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams?.limit}
        />
      </div>
    </div>
  );
};

export default GovernmentBusiness;
