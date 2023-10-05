import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { APPROVE_ACTION_TABLE, PREVIEW_ACTION_TABLE } from "../../../constants";
import { useUtilContexts } from "../../../context/Utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GET_ALL_REJECTED_INNOVATION } from "../../../constans/constans";
import {
  getAllRejectedInnovation,
  updateRejectedInnovation,
} from "../../../services/IndexRating/RejectedInnovation/rejectedInnovation";
import { useNavigate } from "react-router-dom";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
};

const RejectedInnovation = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const queryClient = useQueryClient();

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    [GET_ALL_REJECTED_INNOVATION, filterParams],
    getAllRejectedInnovation(filterParams)
  );

  const updateRejectedInnovationMutation = useMutation(
    updateRejectedInnovation
  );

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const actionTableData = [
    {
      code: PREVIEW_ACTION_TABLE,
      onClick: (item) => {
        navigate(`/review-inovasi-daerah/detail/${item.review_inovasi_id}`);
      },
    },
    {
      code: APPROVE_ACTION_TABLE,
      onClick: (item) => {
        setCurrentItem(item);
        setShowConfirmation(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nomor",
      title: "Nomor",
    },
    {
      key: "judul",
      title: "Judul",
    },
    {
      key: "pemda.pemda_name",
      title: "Pemda",
    },
    {
      key: "waktu_penerapan",
      title: "Waktu Penerapan",
    },
    {
      key: "kematangan",
      title: "Kematangan",
    },
    {
      key: "skor_verifikasi",
      title: "Skor Verifikasi",
    },
    {
      key: "qc",
      title: "QC",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const onHandleAccept = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateRejectedInnovationMutation.mutate(currentItem?.review_inovasi_id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);

        if (res.code) {
          queryClient.invalidateQueries([GET_ALL_REJECTED_INNOVATION]);

          snackbar("Berhasil menyetujui", () => {
            navigate("/inovasi_ditolak");
          });
        }
      },
    });
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
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

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showConfirmation && (
        <ModalConfirmation
          variant="confirm"
          message="Apakah Anda yakin ingin menyetujui"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={onHandleAccept}
        />
      )}

      <div className="text-[#333333] text-2xl">
        Daftar Inovasi Daerah yang ditolak
      </div>
      <div className="flex items-center justify-end gap-2">
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5">
          <BiDownload className="text-base" />
          Unduh Data (PDF)
        </button>
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5">
          <BiDownload className="text-base" />
          Unduh Data (XLS)
        </button>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex w-[60%] gap-4 items-end">
          {/* <button className="border border-[#333333] px-6 py-2 text-sm rounded">
            Tampilkan Semua
          </button> */}
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
      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table
          showNum={true}
          data={data?.data || []}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
        />
        <div className="flex justify-between items-center py-[20px] pl-6">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => onHandlePagination(page.selected)}
            pageRangeDisplayed={3}
            pageCount={data?.pagination.pages || 0}
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

export default RejectedInnovation;
