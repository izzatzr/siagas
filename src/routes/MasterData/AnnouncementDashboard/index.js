import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import { useMutation, useQuery } from "react-query";
import { GET_ALL_ANNOUNCEMENT } from "../../../constans/constans";
import {
  deleteAnnouncemet,
  getAllAnnouncement,
} from "../../../services/MasterData/announcement";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import Pagination from "../../../components/Pagination";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
  category: "",
};

const AnnouncementDashboard = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const tableHeader = [
    {
      key: "title",
      title: "Judul",
    },
    {
      key: "slug",
      title: "Slug",
    },
    {
      title: "Content",
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
        return item?.file?.name?.replace(item?.file?.extension, "");
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/pengumuman/edit/${value.id}`);
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

  const { data, isFetching } = useQuery(
    [GET_ALL_ANNOUNCEMENT, filterParams],
    getAllAnnouncement(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const deleteAnnouncementMutation = useMutation(deleteAnnouncemet);

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
    deleteAnnouncementMutation.mutate(
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
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">Pengumuman</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/pengumuman/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Pengumuman
        </Link>
      </div>
      <div className="flex items-end justify-between w-full px-6 py-4 bg-white rounded-lg">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="w-full outline-none"
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

export default AnnouncementDashboard;
