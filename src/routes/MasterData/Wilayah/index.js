import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { GET_ALL_WILAYAH } from "../../../constans/constans";
import { EDIT_ACTION_TABLE, PREVIEW_ACTION_TABLE } from "../../../constants";
import { getAllWilayah } from "../../../services/MasterData/wilayah";

const initialFilter = {
  limit: 7,
  page: 1,
  q: "",
};

const Wilayah = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const actionTableData = [
    {
      code: PREVIEW_ACTION_TABLE,
      onClick: (value) => {
        // navigate(`/master/opd-daerah/edit/${value.id}`);
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        // navigate(`/master/opd-daerah/edit/${value.id}`);
      },
    },
  ];

  const tableHeader = [
    { key: "name", title: "Nama" },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data } = useQuery(
    [GET_ALL_WILAYAH, filterParams],
    getAllWilayah(filterParams),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const handleSearch = (e) => {
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

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Wilayah</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/wilayah/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Wilayah
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none"
            placeholder="Pencarian"
            onChange={() => console.log("SEARCH")}
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <div className="flex justify-between items-center py-[20px]">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => onHandlePagination(page.selected)}
            pageRangeDisplayed={3}
            pageCount={data?.pagination?.pages}
            previousLabel={<BiChevronLeft />}
            renderOnZeroPageCount={null}
            className="flex gap-3 items-center text-xs"
            pageClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            previousClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            nextClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            disabledClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center bg-[#828282] text-white"
            activeClassName="w-[28px] h-[28px] rounded-md border border-[#069DD9] flex justify-center items-center bg-[#069DD9] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Wilayah;
