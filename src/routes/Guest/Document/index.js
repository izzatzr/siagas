import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import { documentData } from "../../../constans/constans";
import ReactPaginate from "react-paginate";

const Document = () => {
  return (
    <div className="w-full rounded-xl bg-[#F2F2F2] py-8 px-6 flex flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="text-2xl font-bold">Dokumen</div>
        <div className="min-w-[356px] flex items-center gap-3 bg-white rounded py-3 px-4">
          <BiSearch color="#828282" size={14} />
          <input
            type="text"
            className="outline-none text-sm placeholder:text-sm text-[#828282] placeholder:text-[#828282]"
            placeholder="Pencarian"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-scroll gap-3 mt-6">
        {documentData.map((guide, key) => (
          <div className="bg-white rounded px-8 py-4" key={key}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#333333] font-light">
                  {guide.date}
                </span>
                <span className="text-base text-[#333333] font-bold">
                  {guide.description}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BiDownload color="#2F80ED" size={20} />
                <span className="text-sm text-[#2F80ED]">Unduh Dokumen</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-0.5 w-full bg-white rounded px-8 py-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<BiChevronRight />}
          onPageChange={(page) => console.log(page)}
          pageRangeDisplayed={2}
          pageCount={10}
          previousLabel={<BiChevronLeft />}
          forcePage={1}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center gap-2"
          activeClassName="bg-[#069DD9] text-white"
          pageClassName="w-7 h-7 rounded-md flex items-center justify-center text-[13px] font-bold border border-[#DFE3E8]"
          disabledClassName="w-7 h-7 rounded-md flex items-center justify-center text-[13px] bg-[#828282] text-[#E0E0E0] text-white"
          nextClassName="w-7 h-7 rounded-md flex items-center justify-center text-[13px] text-[#C4CDD5] font-bold border border-[#DFE3E8]"
          previousClassName="w-7 h-7 rounded-md flex items-center justify-center text-[13px] text-[#C4CDD5] font-bold border border-[#DFE3E8]"
        />
      </div>
    </div>
  );
};

export default Document;
