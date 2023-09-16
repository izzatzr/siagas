import React from "react";
import SelectOption from "../../../components/SelectOption";
import {BiChevronLeft, BiChevronRight, BiPlus, BiSearch,} from "react-icons/bi";
import Table from "../../../components/Table";
import {useMutation, useQuery} from "react-query";
import {GET_ALL_ANNOUNCEMENT} from "../../../constans/constans";
import {deleteAnnouncemet, getAllAnnouncement,} from "../../../services/MasterData/announcement";
import {DELETE_ACTION_TABLE, EDIT_ACTION_TABLE} from "../../../constants";
import TableAction from "../../../components/TableAction";
import ReactPaginate from "react-paginate";
import {Link, useNavigate} from "react-router-dom";
import {useUtilContexts} from "../../../context/Utils";
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

  const {setLoadingUtil, snackbar} = useUtilContexts();
  const navigate = useNavigate();
  const categories = [
    {
      value: "category 1",
      label: "Category 1",
    },
    {
      value: "category 2",
      label: "Category 2",
    },
    {
      value: "category 3",
      label: "Category 3",
    },
    {
      value: "category 4",
      label: "Category 4",
    },
  ];

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
      key: "content",
      title: "Content",
    },
    {
      key: "file.name",
      title: "File Dokumen",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item}/>,
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

  const deleteAnnouncementMutation = useMutation(deleteAnnouncemet);

  const {data, isLoading} = useQuery(
    [GET_ALL_ANNOUNCEMENT, filterParams],
    getAllAnnouncement(filterParams)
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
    deleteAnnouncementMutation.mutate(
      {
        id: currentItem?.id,
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);
          if (res.code) {
            snackbar("Berhasil dihapus", () => {
              navigate("/master/pengumuman");
            });
          }
        },
      }
    );
  };

  const onHandleSearch = (value) => {
    if (value.length > 3) {
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
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          cancelDelete={() => setShowDelete(false)}
          doDelete={onHandleDelete}
        />
      )}
      <div className="text-[#333333] font-medium text-2xl">Pengumuman</div>
      <div className="flex items-center justify-end gap-2">
        <Link
          to="/master/pengumuman/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base"/>
          Tambah Pengumuman
        </Link>
      </div>
      <div className="flex items-end justify-between w-full px-6 py-4 bg-white rounded-lg">
        <div className="w-[30%]">
          <SelectOption
            label="Kategori"
            placeholder="Pilih Kategori"
            options={categories}
          />
        </div>
        <div
          className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch/>
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
          <Table showNum={true} data={data?.data || []} columns={tableHeader}/>
        </div>
        <div className="flex justify-between items-center py-[20px]">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight/>}
            onPageChange={(page) => onHandlePagination(page.selected)}
            pageCount={data?.pagination?.pages}
            pageRangeDisplayed={3}
            previousLabel={<BiChevronLeft/>}
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

export default AnnouncementDashboard;
