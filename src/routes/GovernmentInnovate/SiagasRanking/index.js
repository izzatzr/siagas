import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import SelectOption from "../../../components/SelectOption";
import Table from "../../../components/Table";
import {
  jsonHeaderSiagasRanking,
  jsonRowSiagasRanking,
} from "../../../dummies/IGA";
import {
  BASE_API_URL,
  GET_ALL_SIAGAS_RANKING,
} from "../../../constans/constans";
import { getAllSiagasRanking } from "../../../services/GovermentInnovate/SiagasRanking/siagasRanking";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { convertQueryString, getToken } from "../../../utils";
import Pagination from "../../../components/Pagination";

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

const SiagasRanking = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);

  const { isLoading, data } = useQuery(
    [GET_ALL_SIAGAS_RANKING, filterParams],
    getAllSiagasRanking(filterParams)
  );

  console.log(data)

  const { setLoadingUtil, snackbar } = useUtilContexts();

  const tableHeader = [
    {
      key: "nama_pemda",
      title: "Nama OPD",
      width : 350
    },
    {
      key: "skor_indeks",
      title: "Skor Indeks",
    },
    {
      key: "skor_penilaian",
      title: "Skor Penilaian",
    },
    {
      key: "skor_akhir",
      title: "Skor Akhir",
    },
    {
      key: "predikat",
      title: "Predikat",
    },
  ];

  const getOPD = async (search = "") => {
    const paramsQueryString = convertQueryString({
      ...initialParamsOPD,
      q: search,
    });
    const response = await fetch(`${BASE_API_URL}/opd?${paramsQueryString}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const responseJSON = await response.json();

    return responseJSON;
  };



  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

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

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl">Rangking SIAGAS</div>
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

export default SiagasRanking;
