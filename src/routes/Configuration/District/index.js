import React from "react";
import { useMutation, useQuery } from "react-query";
import { GET_ALL_DISTRICT_QUERY_KEY } from "../../../constans/constans";
import { deleteDistrict, getAllDistrict } from "../../../services/Configuration/district";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import ModalConfirmation from "../../../components/ModalConfirmation";
import { BiPlus, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";

const initialFilter = {
  page: 1,
  limit: 20,
  name: "",
};

const District = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      label: "Edit",
      onClick: (value) => {
        navigate(`/konfigurasi/distrik/edit/${value.id}`);
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      label: "Hapus",
      onClick: (value) => {
        setCurrentItem(value);
        setShowDelete(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nama_distrik",
      title: "Nama Distrik",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data, isFetching } = useQuery(
    [GET_ALL_DISTRICT_QUERY_KEY, filterParams],
    getAllDistrict(filterParams)
  );

  const deleteDistrictMutation = useMutation(deleteDistrict);

  const onHandleSearch = (value) => {
    if (value.length > 3) {
      setFilterParams({
        ...filterParams,
        name: value,
      });
    } else if (value.length === 0) {
      setFilterParams({
        ...filterParams,
        name: "",
      });
    }
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);

    deleteDistrictMutation.mutate(
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
          snackbar("Terjadi kesalahan", () => { }, "error");
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="delete"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">Distrik</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/konfigurasi/distrik/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Distrik
        </Link>
      </div>
      <div className="flex items-end justify-between w-full px-6 py-4 bg-white rounded-lg">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Pencarian"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onHandleSearch(e.target.value);
              }
            }}
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

export default District;
