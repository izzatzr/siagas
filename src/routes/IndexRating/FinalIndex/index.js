import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import SelectOption from "../../../components/SelectOption";
import { EDIT_ACTION_TABLE } from "../../../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_API_URL, GET_FINAL_INDEX } from "../../../constans/constans";
import {
  getAllFinalIndex,
  updateFinalIndex,
} from "../../../services/IndexRating/FinalIndex/finalIndex";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import ReactPaginate from "react-paginate";
import { convertQueryString, getToken } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
};

const initialParamsRegion = {
  page: 1,
  limit: 20,
  name: "",
};

const FinalIndex = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    [GET_FINAL_INDEX, filterParams],
    getAllFinalIndex(filterParams)
  );

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const updateFinalIndexMutation = useMutation(updateFinalIndex);

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      label : "Edit",
      onClick: (item) => {
        setCurrentItem(item);
        setShowConfirmation(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nama_daerah",
      title: "Daerah",
    },
    {
      key: "jumlah_inovasi",
      title: "Jumlah Inovasi",
    },
    {
      key: "total_skor_mandiri",
      title: "Nilai Indeks Mandiri",
    },
    {
      key: "nilai_indeks_verifikasi",
      title: "Nilai Indeks Verifikasi",
    },
    {
      key: "predikat",
      title: "Predikat",
    },
    {
      key: "nominator",
      title: "Nominator",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

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

  const onHandleUpdateToYes = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateFinalIndexMutation.mutate(
      {
        id: currentItem?.id,
        nominator: "Ya",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_FINAL_INDEX]);

            snackbar("Berhasil mengubah", () => {
              navigate("/rekap-indeks-akhir");
            });
          }
        },
      }
    );
  };

  const onHandleUpdateToNo = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateFinalIndexMutation.mutate(
      {
        id: currentItem?.id,
        nominator: "Tidak",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_FINAL_INDEX]);

            snackbar("Berhasil mengubah", () => {
              navigate("/rekap-indeks-akhir");
            });
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showConfirmation && (
        <ModalConfirmation
          variant="option"
          message="Ubah Nominator YA/TIDAK"
          onCancel={onHandleUpdateToNo}
          onConfirm={onHandleUpdateToYes}
        />
      )}

      <div className="text-[#333333] text-2xl">Rekap Indeks Akhir</div>
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
          {/* <div className="w-[60%]">
            <SelectOption
              label="Klaster"
              placeholder="Pilih Klaster"
              options={loadOptionRegions}
              onChange={onHandleRegionChange}
              value={selectedRegion}
              paginate
            />
          </div>
          <button
            onClick={resetRegion}
            className="border border-[#333333] px-6 py-2 text-sm rounded"
          >
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
          ranking={true}
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

export default FinalIndex;
