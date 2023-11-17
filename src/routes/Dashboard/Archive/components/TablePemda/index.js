import React from "react";
import {AiFillFileExcel, AiFillFilePdf} from "react-icons/ai";
import {MdEdit} from "react-icons/md";
import {FaTrash} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {formatDate} from "../../../../../helpers/formatDate";

const tableHeader = [
  {
    label: "#",
  },
  {
    label: "Nama Pemda",
  },
  {
    label: "Nama Inovasi",
  },
  {
    label: "Tahapan Inovasi",
  },
  {
    label: "Waktu Uji Coba",
  },
  {
    label: "Waktu Penerapan",
  },
  {
    label: "Kematangan",
  },
  {
    label: "Aksi",
  },
];

const TablePemda = ({data, paginationData, onHandlePagination}) => {
  return (
    <div className="w-full bg-white rounded-lg">
      <table className="w-full table">
        <thead>
        <tr className="border-b">
          {tableHeader.map((title, index) => (
            <th
              className={`text-[13px] text-[#717171] font-medium py-3 ${
                index === 1 && "text-left"
              }`}
              key={index}
            >
              {title.label}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr className="border-b text-[#333333] px-4" key={item.id}>
            <td className="text-[13px] py-3 text-center w-10">{index + 1}</td>
            <td className="text-[13px] py-3">{item.nama_daerah}</td>
            <td className="text-[13px] py-3 text-center">{item.innovation_name}</td>
            <td className="text-[13px] py-3 uppercase text-center">
              {item.innovation_phase}
            </td>
            <td className="text-[13px] py-3 uppercase text-center">
              {formatDate(item.trial_time)}
            </td>
            <td className="text-[13px] py-3 uppercase text-center">
              {formatDate(item.implementation_time)}
            </td>
            <td className="text-[13px] py-3 uppercase text-center">{item.skor}</td>
            <td className="text-[13px] py-3 pr-12 float-right">
              <div className="flex w-full items-center gap-4">
                <AiFillFilePdf className="cursor-pointer"/>
                <AiFillFileExcel className="cursor-pointer"/>
                <MdEdit className="cursor-pointer"/>
                <FaTrash className="cursor-pointer"/>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center py-[20px] pl-6">
        
        <ReactPaginate
          breakLabel="..."
          nextLabel={<BiChevronRight/>}
          onPageChange={(page) => onHandlePagination(page.selected)}
          pageRangeDisplayed={3}
          pageCount={paginationData?.pages || 0}
          previousLabel={<BiChevronLeft/>}
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
  );
};

export default TablePemda;
