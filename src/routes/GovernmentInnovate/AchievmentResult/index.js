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
import TableAction from "../../../components/TableAction";
import { EDIT_ACTION_TABLE } from "../../../constants";
import {
  jsonHeaderAchievmentResult,
  jsonRowAchievmentResult,
} from "../../../dummies/IGA";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { useQuery, useQueryClient } from "react-query";
import { getAllAchievmentResult } from "../../../services/GovermentInnovate/AchievmentResult/achievmentResult";
import {
  BASE_API_URL,
  GET_ALL_ACHIEVMENT_RESULT,
} from "../../../constans/constans";
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

const AchievmentResult = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  const { isLoading, data } = useQuery(
    [GET_ALL_ACHIEVMENT_RESULT, filterParams],
    getAllAchievmentResult(filterParams)
  );

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const tableHeader = [
    {
      key: "nama_pemda",
      title: "Nama Pemda",
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

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
    const res = await getOPD(search);

    const data = {
      options: res?.data,
      hasMore: res.has_more,
      additional: {
        page: page + 1,
      },
    };

    return data;
  };

  React.useEffect(() => {
    getOPD().then((data) => {
      setSelectedOPD(data.data[0]);
      setFilterParams({
        ...filterParams,
        pemda_id: data.data[0].id,
      });
    });
  }, []);

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

  const onHandleOPDChange = (opd) => {
    setSelectedOPD(opd);
    setFilterParams({
      ...filterParams,
      pemda_id: opd.id,
    });
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl">Prestasi Dan Hasil Lapangan</div>
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
          <div className="w-[60%]">
            <SelectOption
              label="Klaster"
              placeholder="Pilih Klaster"
              options={loadOptionOPD}
              onChange={(e) => onHandleOPDChange(e)}
              value={selectedOPD}
              paginate
            />
          </div>
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
