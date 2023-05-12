import React from "react";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import Table from "../../../components/Table";
import { GET_ALL_DOCUEMNT_CATEGORY } from "../../../constans/constans";
import { getAllDocumentCategory } from "../../../services/MasterData/documentCategory";

const initialFilter = {
  limit: 7,
  page: 1,
  q: "",
};

const DocumentCategory = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const tableHeader = [
    { key: "name", title: "Nama Kategori" },
    { key: "slug", title: "Slug" },
  ];

  const { data } = useQuery(
    [GET_ALL_DOCUEMNT_CATEGORY, filterParams],
    getAllDocumentCategory(filterParams),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const handleSearch = (e) => {
    let value = e.target.value;

    if (value.length === 0) {
      setFilterParams({
        ...filterParams,
        q: "",
        page: 1,
      });
    }

    if (value.length >= 3) {
      setFilterParams({
        ...filterParams,
        q: e.target.value,
        page: 1,
      });
    }
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">
        Kategori Dokumen
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
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

export default DocumentCategory;
