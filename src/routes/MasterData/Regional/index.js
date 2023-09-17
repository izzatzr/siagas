import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { GET_ALL_REGIONAL } from "../../../constans/constans";
import { EDIT_ACTION_TABLE } from "../../../constants";
import { getAllRegional } from "../../../services/MasterData/regional";

const initialFilter = {
  limit: 20,
  page: 1,
  name: "",
};

const Regional = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const navigate = useNavigate();

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/opd-daerah/edit/${value.id}`);
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
    [GET_ALL_REGIONAL, filterParams],
    getAllRegional(filterParams),
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
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Daerah</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/opd-daerah/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Daerah
        </Link>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none"
            placeholder="Pencarian"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
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
            className="flex items-center gap-3 text-xs"
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

export default Regional;
