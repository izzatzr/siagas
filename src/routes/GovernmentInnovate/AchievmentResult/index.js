import React from "react";
import { BiDownload, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { useQuery } from "react-query";
import {
  getAllAchievmentResult,
  getDownloadAchievmentResult,
} from "../../../services/GovermentInnovate/AchievmentResult/achievmentResult";
import { GET_ALL_ACHIEVMENT_RESULT } from "../../../constans/constans";
import Pagination from "../../../components/Pagination";
import { downloadExcelBlob } from "../../../utils";
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

const AchievmentResult = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);

  const { isLoading, data } = useQuery(
    [GET_ALL_ACHIEVMENT_RESULT, filterParams],
    getAllAchievmentResult(filterParams)
  );

  const { setLoadingUtil, snackbar } = useUtilContexts();

  const tableHeader = [
    {
      key: "nama_pemda",
      title: "Nama OPD",
    },
    {
      key: "skor_pengukuran",
      title: "Skor Pengukuran",
    },
    {
      key: "validasi_lapangan",
      title: "Validasi Lapangan",
    },
    {
      key: "skor_akhir",
      title: "Skor Akhir",
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

  const onHandleDownloadPDf = () => {
    const columns = [
      "No.",
      "Nama Pemda",
      "Skor Pengukuran",
      "Presentasi",
      "Validasi Lapangan",
      "Skor Akhir"
    ];
    var rows = [];

    for (let i = 0; i < data?.data?.length; i++) {
      var temp = [
        i + 1,
        data?.data?.[i].nama_pemda,
        parseFloat(data?.data?.[i].skor_pengukuran).toFixed(2),
        data?.data?.[i].presentasi,
        data?.data?.[i].validasi_lapangan,
        parseFloat(data?.data?.[i].skor_akhir).toFixed(2),

      ];
      rows.push(temp);
    }

    let fileName = `prestasi-hasil-lapangan-${new Date().getTime()}`;


    printToPDF(columns, rows, fileName, "Table Prestasi dan Hasil Lapangan")
  };

  const onHandleDownloadFile = (type) => {
    const newParams = {
      type,
    };

    if (filterParams.q) {
      newParams["q"] = filterParams.q;
    }

    let fileName = `prestasi-hasil-lapangan-${new Date().getTime()}`;

    downloadExcelBlob({
      api: getDownloadAchievmentResult(newParams),
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
      <div className="text-[#333333] text-2xl">Prestasi Dan Hasil Lapangan</div>
      <div className="flex items-center justify-end gap-2">
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5" onClick={onHandleDownloadPDf}>
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

export default AchievmentResult;
