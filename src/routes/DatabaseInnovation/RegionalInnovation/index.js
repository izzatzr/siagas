import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import SelectOption from "../../../components/SelectOption";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { EXCEL_ACTION_TABLE, PDF_ACTION_TABLE } from "../../../constants";
import {
  jsonHeaderRegionalInnovation,
  jsonRowRegionalInnovation,
} from "../../../dummies/innovationDatabase";
import FilterArsip from "../../Dashboard/Archive/components/FilterArsip";

const RegionalInnovation = () => {
  const actionTableData = [
    {
      code: PDF_ACTION_TABLE,
      onClick: () => {
        console.log(PDF_ACTION_TABLE);
      },
    },
    {
      code: EXCEL_ACTION_TABLE,
      onClick: () => {
        console.log(EXCEL_ACTION_TABLE);
      },
    },
  ];

  const regions = [
    { value: "kerinci", label: "Kabupaten Kerinci" },
    { value: "siak", label: "Kabupaten Siak" },
    { value: "mirangi", label: "Kabupaten Mirangin" },
    { value: "simalungu", label: "Kabupaten Simalungun" },
    { value: "labuhanbatu selatan", label: "Kabupaten LabuhanBatu Selatan" },
    { value: "subulussalam", label: "Kota Subulussalam" },
  ];

  const innovationForm = [
    {
      value:
        "Inovasi daerah lainnya sesuai dengan urusan pemerintahan yang menjadi kewenagan daerah",
      label:
        "Inovasi daerah lainnya sesuai dengan urusan pemerintahan yang menjadi kewenagan daerah",
    },
    { value: "Inovasi pelayanan publik", label: "Inovasi pelayanan publik" },
    {
      value: "Invasi tata kelola pemerintahan daerah",
      label: "Invasi tata kelola pemerintahan daerah",
    },
    {
      value: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
      label: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
    },
    {
      value: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
      label: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
    },
    {
      value: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
      label: "Lorem ipsum dolor sit amet consectetur. Magna viverra integer.",
    },
  ];

  const businessType = [
    {
      value:
        "Lorem ipsum dolor sit amet consectetur. Leo ipsum laoreet urna massa.",
      label:
        "Lorem ipsum dolor sit amet consectetur. Leo ipsum laoreet urna massa.",
    },
    {
      value:
        "Lorem ipsum dolor sit amet consectetur. Facilisi nunc amet et in amet.",
      label:
        "Lorem ipsum dolor sit amet consectetur. Facilisi nunc amet et in amet.",
    },
    {
      value:
        "Lorem ipsum dolor sit amet consectetur. Egestas lectus morbi eget.",
      label:
        "Lorem ipsum dolor sit amet consectetur. Egestas lectus morbi eget.",
    },
    {
      value:
        "Lorem ipsum dolor sit amet consectetur. Leo ipsum laoreet urna massa.",
      label:
        "Lorem ipsum dolor sit amet consectetur. Leo ipsum laoreet urna massa.",
    },
    {
      value:
        "Lorem ipsum dolor sit amet consectetur. Egestas lectus morbi eget.",
      label:
        "Lorem ipsum dolor sit amet consectetur. Egestas lectus morbi eget.",
    },
  ];

  const innitiators = [
    {
      label: "Kepala Daerah",
      value: "Kepala Daerah",
    },
    {
      label: "Anggota DPRD",
      value: "Anggota DPRD",
    },
    {
      label: "OPD",
      value: "OPD",
    },
    {
      label: "ASN",
      value: "ASN",
    },
    {
      label: "Masyarakat",
      value: "Masyarakat",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Inovasi Daerah</div>
      <div className="w-full rounded-lg text-[#333333] bg-[#FFC90C4D] p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AiFillInfoCircle color="#F2994A" />
          <span className="text-base font-medium text-[#333333]">
            Harap diperhatikan!
          </span>
        </div>
        <p className="text-[#333333] text-sm">
          Inovasi Daerah yang dinilai pada sistem indeks inovasi daerah adalah
          inovasi yang telah dilakukan Penerapan dalam kurun waktu maksimal 2
          tahun yaitu 1 Januari 2020 s.d. 31 Desember 2021
        </p>
      </div>
      <div className="mt-4">
        <FilterArsip />
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex flex-col gap-4">
        <div className="">
          <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%] float-right">
            <BiSearch />
            <input
              type="text"
              className="outline-none"
              placeholder="Pencarian"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectOption
            label="Daerah"
            placeholder="Pilih Daerah"
            options={regions}
          />
          <SelectOption
            label="Bentuk Inovasi"
            placeholder="Pilih Bentuk Inovasi"
            options={innovationForm}
          />
          <SelectOption
            label="Jenis Urusan"
            placeholder="Pilih Jenis Urusan"
            options={businessType}
          />
          <SelectOption
            label="Inisiator"
            placeholder="Pilih Inisiator"
            options={innitiators}
          />
        </div>
      </div>

      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table
          showNum={true}
          data={jsonRowRegionalInnovation}
          columns={jsonHeaderRegionalInnovation}
          action={<TableAction data={actionTableData} />}
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

export default RegionalInnovation;
