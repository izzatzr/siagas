import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiPlus,
  BiSearch,
} from "react-icons/bi";

import { useMutation, useQuery } from "react-query";
import Table from "../../../components/Table";
import { GET_ALL_DOCUEMNT_CATEGORY } from "../../../constans/constans";
import {
  deleteDocumentCategory,
  getAllDocumentCategory,
} from "../../../services/MasterData/documentCategory";
import Pagination from "../../../components/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  limit: 7,
  page: 1,
  q: "",
};

const DocumentCategory = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/kategori-dokumen/edit/${value.id}`);
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
    { key: "name", title: "Nama Kategori" },
    { key: "slug", title: "Slug" },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data, isFetching } = useQuery(
    [GET_ALL_DOCUEMNT_CATEGORY, filterParams],
    getAllDocumentCategory(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const deleteDocumentCategoryMutation = useMutation(deleteDocumentCategory);

  const onHandleSearch = (e) => {
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

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);

    deleteDocumentCategoryMutation.mutate(
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
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="delete"
          message="Apakah Anda yakin ingin menghapus ?"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">
        Kategori Dokumen
      </div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/kategori-dokumen/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Kategori Dokumen
        </Link>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Pencarian"
            onChange={onHandleSearch}
          />
        </div>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
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

export default DocumentCategory;
