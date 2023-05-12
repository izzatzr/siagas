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
import SelectOption from "../../../components/SelectOption";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { GET_ALL_INDICATOR } from "../../../constans/constans";
import { EDIT_ACTION_TABLE, INDICATOR_ACTION_TABLE } from "../../../constants";
import { getAllIndicator } from "../../../services/MasterData/indicator";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
  jenis_indikator: "",
};

const Indicator = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const navigate = useNavigate();

  const { data } = useQuery(
    [GET_ALL_INDICATOR, filterParams],
    getAllIndicator(filterParams),
  );

  const actionTableData = [
    {
      code: INDICATOR_ACTION_TABLE,
      onClick: (value) => {
        alert("INDICATOR");
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/indikator/edit/${value.id}`)
      },
    },
  ];

  const tableHeader = [
    {
      key: "serial_number",
      title: "No. Urut",
      width: 100,
    },
    {
      key: "type",
      title: "Tipe",
      width: 120,
    },
    {
      key: "indicator",
      title: "Indikator",
      width: 120,
    },
    {
      key: "supporting_data",
      title: "Data Pendukung",
      width: 120,
    },
    {
      key: "file_type",
      title: "Jenis File",
      width: 120,
    },
    {
      key: "document_form",
      title: "Bentuk Dokumen",
      width: 120,
    },
    {
      key: "file_format",
      title: "Format File",
      width: 120,
    },

    {
      key: "value",
      title: "Bobot",
      width: 80,
    },
    {
      key: "value",
      title: "Satuan Nilai",
      width: 80,
      render: () => <>-</>,
    },
    {
      key: "indicator_type",
      title: "Jenis",
      width: 120,
    },
    {
      key: "group",
      title: "Group",
      width: 120,
    },
    {
      key: "parent",
      title: "Parent",
      width: 120,
    },
    {
      key: "sub",
      title: "Subs",
      width: 120,
    },
    {
      key: "mandatory",
      title: "Mandatory",
      width: 120,
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];
  const categories = [
    {
      value: "category 1",
      label: "Category 1",
    },
    {
      value: "category 2",
      label: "Category 2",
    },
    {
      value: "category 3",
      label: "Category 3",
    },
    {
      value: "category 4",
      label: "Category 4",
    },
  ];

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };
  
  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Indikator</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/indikator/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Indikator
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6 flex items-end justify-between">
        <div className="w-[30%]">
          <SelectOption
            label="Jenis Indikator"
            placholder="Pilih indikator"
            options={categories}
          />
        </div>
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none"
            placeholder="Pencarian"
            onChange={() => console.log("TEST")}
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <div className="overflow-x-scroll">
          <Table showNum={true} data={data?.data || []} columns={tableHeader} width="w-[2000px]" />
        </div>
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

export default Indicator;
