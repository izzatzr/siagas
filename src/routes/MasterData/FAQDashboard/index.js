import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import { useMutation, useQuery } from "react-query";
import { GET_ALL_FAQ } from "../../../constans/constans";
import { deleteFAQ, getAllFAQ } from "../../../services/MasterData/faq";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { useUtilContexts } from "../../../context/Utils";
import ReactPaginate from "react-paginate";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
};

const FAQDashboard = () => {
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();
  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/faq/edit/${value.id}`);
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      onClick: (value) => {
        setCurrentItem(value);
        setShowDelete(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "question",
      title: "Question",
    },
    {
      key: "answer",
      title: "Answer",
      parser: "html",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const deleteFAQMutation = useMutation(deleteFAQ);

  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_FAQ, filterParams],
    getAllFAQ(filterParams)
  );

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);
    deleteFAQMutation.mutate(
      {
        id: currentItem?.id,
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);
          if (res.code) {
            snackbar("Berhasil dihapus", refetch);
          }
        },
      }
    );
  };

  const onHandleSearch = (value) => {
    if (value.length >= 3) {
      setFilterParams({
        q: value,
      });
    } else if (value.length === 0) {
      setFilterParams({
        q: "",
      });
    }
  };

  React.useEffect(() => {
    setLoadingUtil(isLoading);
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="delete"
          message="Apakah Anda yakin ingin menghapus?"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">FAQ</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/faq/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah FAQ
        </Link>
      </div>
      <div className="flex items-end justify-between w-full px-6 py-4 bg-white rounded-lg">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none"
            placeholder="Pencarian"
            onChange={(e) => onHandleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <div className="overflow-x-scroll">
          <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        </div>
        <div className="flex justify-between items-center py-[20px]">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => onHandlePagination(page.selected)}
            pageCount={data?.pagination?.pages}
            pageRangeDisplayed={3}
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

export default FAQDashboard;
