import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import SelectOption from "../../../components/SelectOption";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import {
  DOWNLOAD_TABLE,
  PREVIEW_ACTION_TABLE,
  REJECT_ACTION_TABLE,
} from "../../../constants";
import {
  jsonHeaderReviewResults,
  jsonRowReviewResults,
} from "../../../dummies/indexRatings";

const ReviewResult = () => {
  const actionTableData = [
    {
      code: DOWNLOAD_TABLE,
      onClick: () => {
        console.log(DOWNLOAD_TABLE);
      },
    },
    {
      code: PREVIEW_ACTION_TABLE,
      onClick: () => {
        console.log(PREVIEW_ACTION_TABLE);
      },
    },
    {
      code: REJECT_ACTION_TABLE,
      onClick: () => {
        console.log(REJECT_ACTION_TABLE);
      },
    },
  ];

  const regions = [
    {
      value: "wilayah 1",
      label: "Wilayah 1",
    },
    {
      value: "wilayah 2",
      label: "Wilayah 2",
    },
    {
      value: "wilayah 3",
      label: "Wilayah 3",
    },
    {
      value: "wilayah 4",
      label: "Wilayah 4",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Hasil Review Inovasi Daerah</div>
      <div className="flex justify-end items-center gap-2">
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5">
          <BiDownload className="text-base" />
          Unduh Data (PDF)
        </button>
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5">
          <BiDownload className="text-base" />
          Unduh Data (XLS)
        </button>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex w-[60%] gap-4 items-end">
          <div className="w-[60%]">
            <SelectOption
              label="Tampilkan berdasarkan daerah"
              placholder="Pilih Wilayah"
              options={regions}
            />
          </div>
          <button className="border border-[#333333] px-6 py-2 text-sm rounded">
            Tampilkan Semua
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input type="text" className="outline-none" placeholder="Pencarian" />
        </div>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table
          showNum={true}
          data={jsonRowReviewResults}
          columns={jsonHeaderReviewResults}
          action={<TableAction data={actionTableData} />}
          ranking={true}
        />
        <div className="flex justify-between items-center py-[20px] pl-6">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => console.log(page)}
            pageRangeDisplayed={3}
            pageCount={10}
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

export default ReviewResult;
