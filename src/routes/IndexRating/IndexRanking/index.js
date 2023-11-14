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
import { EDIT_ACTION_TABLE } from "../../../constants";
import { useUtilContexts } from "../../../context/Utils";
import { useNavigate } from "react-router-dom";
import { GET_ALL_INDEX_RANKING } from "../../../constans/constans";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllIndexRanking,
  getDownloadIndexRanking,
  updateIndexRanking,
} from "../../../services/IndexRating/IndexRanking/indexRanking";
import ModalConfirmation from "../../../components/ModalConfirmation";
import { downloadExcelBlob } from "../../../utils";
import { printToPDF } from "../../../helpers/common";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
};

const IndexRanking = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    [GET_ALL_INDEX_RANKING, filterParams],
    getAllIndexRanking(filterParams)
  );

  const updateIndexRankingMutation = useMutation(updateIndexRanking);

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      label: "Edit",
      onClick: (item) => {
        setCurrentItem(item);
        setShowConfirmation(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nama_daerah",
      title: "OPD",
    },
    {
      key: "nilai_indeks",
      title: "Nilai Indeks (Pengukuran Mandiri)",
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

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleSearch = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      setFilterParams({
        ...filterParams,
        q: value,
      });
    }
  };

  const onHandleUpdateToYes = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateIndexRankingMutation.mutate(
      {
        id: currentItem?.id,
        nominator: "Ya",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_INDEX_RANKING]);

            snackbar("Berhasil mengubah", () => {
              navigate("/ranking-indeks");
            });
          }
        },
      }
    );
  };

  const onHandleUpdateToNo = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateIndexRankingMutation.mutate(
      {
        id: currentItem?.id,
        nominator: "Tidak",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_INDEX_RANKING]);

            snackbar("Berhasil mengubah", () => {
              navigate("/ranking-indeks");
            });
          }
        },
      }
    );
  };

  const onHandleDownloadFile = (type) => {
    const newParams = {
      type,
    };

    if (filterParams.q) {
      newParams["q"] = filterParams.q;
    }

    let fileName = `index-ranking-${new Date().getTime()}`;

    downloadExcelBlob({
      api: getDownloadIndexRanking(newParams),
      titleFile: fileName,
      onError: () => {
        snackbar("Terjadi Kesalahan", () => {}, "error");
      },
    });
  };

  const onHandleDownloadPDf = () => {
    const columns = [
      "No.",
      "Nama Daerah",
      "Jumlah Inovasi",
      "Total Skor",
      "Nilai Indeks",
      "Total File",
      "Predikat",
      "Indeks",
      "Nomimator",
    ];
    var rows = [];

    for (let i = 0; i < data?.data?.length; i++) {
      var temp = [
        i + 1,
        data?.data?.[i].nama_daerah,
        data?.data?.[i].jumlah_inovasi,
        data?.data?.[i].total_skor_mandiri,
        data?.data?.[i].nilai_indeks,
        data?.data?.[i].total_file,
        data?.data?.[i].predikat,
        data?.data?.[i].indeks,
        data?.data?.[i].nominator || "-",

      ];
      rows.push(temp);
    }

    let fileName = `index-ranking-${new Date().getTime()}`;


    printToPDF(columns, rows, fileName, "Table Ranking Indeks")
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
      {showConfirmation && (
        <ModalConfirmation
          variant="option"
          message="Ubah Nominator YA/TIDAK"
          onCancel={onHandleUpdateToNo}
          onConfirm={onHandleUpdateToYes}
        />
      )}

      <div className="text-[#333333] text-2xl">Ranking Indeks</div>
      <div className="flex items-center justify-end gap-2">
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          onClick={onHandleDownloadPDf}
        >
          <BiDownload className="text-base" />
          Unduh Data (PDF)
        </button>
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          onClick={() => {
            onHandleDownloadFile("xlsx");
          }}
        >
          <BiDownload className="text-base" />
          Unduh Data (XLS)
        </button>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Pencarian"
            onKeyDown={(e) => onHandleSearch(e)}
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

export default IndexRanking;
