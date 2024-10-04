import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { getPageLabel } from "../../helpers/paginationCount";

const Pagination = (props) => {
  const { pageCount, onHandlePagination, totalData, size } = props;

  return (
    <div className="flex justify-end items-center py-[20px]">
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
        activeClassName="w-[28px] h-[28px] rounded-md border border-[#069DD9] flex justify-center items-center bg-[#063a69] text-white"
      />
    </div>
  );
};

export default Pagination;
