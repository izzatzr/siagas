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
import ModalDelete from "../../../components/ModalDelete";
import Pagination from "../../../components/Pagination";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
};

const FAQDashboard = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

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
      width : 300,
    },
    {
      title: "Answer",
      render: (item) => {
        return (
          <div
            className="w-full h-24 overflow-scroll"
            dangerouslySetInnerHTML={{
              __html: item?.answer,
            }}
          />
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data, isFetching, refetch } = useQuery(
    [GET_ALL_FAQ, filterParams],
    getAllFAQ(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const deleteFAQMutation = useMutation(deleteFAQ);

  const onHandleSearch = (value) => {
    if (value.length > 3) {
      setFilterParams({
        ...filterParams,
        q: value,
      });
    } else if (value.length === 0) {
      setFilterParams({
        ...filterParams,
        q: "",
      });
    }
  };

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
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar("Berhasil dihapus", () => {
              navigate(0);
            });
          }
        },
        onError: () => {
          setLoadingUtil(false);
          snackbar("Terjadi kesalahan", () => {}, "error");
        },
      }
    );
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      {showDelete && (
        <ModalDelete
          cancelDelete={() => setShowDelete(false)}
          doDelete={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">FAQ</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/faq/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah FAQ
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6 flex items-end justify-between">
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
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <div className="overflow-x-scroll">
          <Table showNum={true} data={data?.data || []} columns={tableHeader} align={"align-top"} />
        </div>
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams?.limit}
        />
      </div>
    </div>
  );
};

export default FAQDashboard;
