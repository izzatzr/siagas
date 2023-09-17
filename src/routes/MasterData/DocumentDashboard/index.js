import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../../../components/SelectOption";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import Table from "../../../components/Table";
import { useMutation, useQuery } from "react-query";
import {
  deleteDocument,
  getAllDocuments,
} from "../../../services/MasterData/document";
import { BASE_API_URL, GET_ALL_DOCUEMNT } from "../../../constans/constans";
import { useUtilContexts } from "../../../context/Utils";
import Pagination from "../../../components/Pagination";
import { convertQueryString, getToken } from "../../../utils";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
  category: "",
};

const initialDocumentCategoryParams = {
  page: 1,
  limit: 20,
  q: "",
};

const DocumentDashboard = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [categorySelected, setCategorySelected] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/dokumen/edit/${value.id}`);
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
      key: "category.name",
      title: "Kategori",
    },
    {
      key: "title",
      title: "Judul",
    },
    {
      title: "Deskripsi",
      render: (item) => {
        return (
          <div
            className="truncate w-60"
            dangerouslySetInnerHTML={{
              __html: `${item?.content}`,
            }}
          ></div>
        );
      },
    },
    {
      title: "File Dokumen",
      render: (item) => {
        return item?.document?.name?.replace(item?.document?.extension, "");
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const loadDocumentCategory = async () => {
    const paramsQueryString = convertQueryString(initialDocumentCategoryParams);

    const response = await fetch(
      `${BASE_API_URL}/kategori_dokumen?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    return await response.json();
  };

  const loadedOptionsDocumentCategory = async (
    search,
    loadedOptions,
    { page }
  ) => {
    const responseJSON = await loadDocumentCategory();
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        label: item.name,
        value: item?.name,
      });
    });

    return {
      options: results,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      },
    };
  };

  const { data, isFetching } = useQuery(
    [GET_ALL_DOCUEMNT, filterParams],
    getAllDocuments(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const deleteDocumentMutation = useMutation(deleteDocument);

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

    deleteDocumentMutation.mutate(
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

  const onHandleChangeDocumentCategory = (value) => {
    setCategorySelected(value);
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  React.useEffect(() => {
    if (categorySelected) {
      setFilterParams({
        ...filterParams,
        category: categorySelected?.id,
      });
    }
  }, [categorySelected]);

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
      <div className="text-[#333333] font-medium text-2xl">Dokumen</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/dokumen/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Dokumen
        </Link>
      </div>
      <div className="flex items-end justify-between w-full px-6 py-4 bg-white rounded-lg">
        <div className="w-[30%]">
          <SelectOption
            label="Kategori"
            placeholder="Pilih Kategori"
            options={loadedOptionsDocumentCategory}
            paginate={true}
            onChange={onHandleChangeDocumentCategory}
            value={categorySelected}
          />
        </div>
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

export default DocumentDashboard;
