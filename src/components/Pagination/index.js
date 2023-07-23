import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { getPageLabel } from "../../helpers/paginationCount";

const Pagination = (props) => {
  const { pageCount, onHandlePagination, totalData, size } = props;
  return (
    <div className="flex justify-between items-center py-[20px]">
      <span className="trext-[#828282] text-xs">
        Menampilkan {getPageLabel(totalData, size, pageCount - 1)} dari{" "}
        {totalData} entri
      </span>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<BiChevronRight />}
        onPageChange={(page) => {
          onHandlePagination(page.selected);
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
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
  );
};

export default Pagination;
