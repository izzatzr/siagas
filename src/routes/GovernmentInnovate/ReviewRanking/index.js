import React from "react";
import { BiDownload, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import { EDIT_ACTION_TABLE } from "../../../constants";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { GET_ALL_REVIEW_RANKING } from "../../../constans/constans";
import {
  getAllReviewRanking,
  getDownloadReviewRanking,
  updateReviewRanking,
} from "../../../services/GovermentInnovate/ReviewRanking/reviewRanking";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { downloadExcelBlob } from "../../../utils";
import Pagination from "../../../components/Pagination";
import ModalConfirmation from "../../../components/ModalConfirmation";
import { printToPDF } from "../../../helpers/common";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  pemda_id: null,
};

const initialParamsOPD = {
  limit: 20,
  page: 1,
  q: "",
};

const ReviewRanking = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    [GET_ALL_REVIEW_RANKING, filterParams],
    getAllReviewRanking(filterParams)
  );

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const updateReviewRankingMutation = useMutation(updateReviewRanking);

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
      key: "nama_pemda",
      title: "Nama OPD",
    },
    {
      key: "jumlah_inovasi",
      title: "Total Innovasi",
    },
    {
      key: "rata_rata",
      title: "Rata-Rata",
    },
    {
      key: "skor_total",
      title: "Skor Total",
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

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleUpdateToYes = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateReviewRankingMutation.mutate(
      {
        id: currentItem?.pemda_id,
        nominator: "Ya",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_REVIEW_RANKING]);

            snackbar("Berhasil mengubah", () => {
              navigate("/peringkat-hasil-review");
            });
          }
        },
      }
    );
  };

  const onHandleUpdateToNo = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateReviewRankingMutation.mutate(
      {
        id: currentItem?.pemda_id,
        nominator: "Tidak",
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_REVIEW_RANKING]);

            snackbar("Berhasil mengubah", () => {
              navigate("/peringkat-hasil-review");
            });
          }
        },
      }
    );
  };

  const onHandleDownloadPDf = () => {
    const columns = [
      "No.",
      "Nama Pemda",
      "Jumlah Inovasi",
      "ISP",
      "Rata-rata",
      "Skor Total",
      "Predikat",
      "Nominator",
    ];
    var rows = [];

    for (let i = 0; i < data?.data?.length; i++) {
      var temp = [
        i + 1,
        data?.data?.[i].nama_pemda,
        data?.data?.[i].jumlah_inovasi,
        data?.data?.[i].isp,
        parseFloat(data?.data?.[i].rata_rata).toFixed(2),
        data?.data?.[i].skor_total,
        data?.data?.[i].predikat,
        data?.data?.[i].nominator,
        
      ];
      rows.push(temp);
    }

    let fileName = `peringkat-hasil-review-${new Date().getTime()}`;

    printToPDF(columns, rows, fileName, "Table Peringkat Hasil Review");
  };

  const onHandleDownloadFile = (type) => {
    const newParams = {
      type,
    };

    if (filterParams.q) {
      newParams["q"] = filterParams.q;
    }

    let fileName = `peringkat-hasil-review-${new Date().getTime()}`;

    downloadExcelBlob({
      api: getDownloadReviewRanking(newParams),
      titleFile: fileName,
      onError: () => {
        snackbar("Terjadi Kesalahan", () => {}, "error");
      },
    });
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

      <div className="text-[#333333] text-2xl">Peringkat Hasil Review</div>
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
            className="outline-none"
            placeholder="Pencarian"
            onChange={(e) => onHandleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default ReviewRanking;
