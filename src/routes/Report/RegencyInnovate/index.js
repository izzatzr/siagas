import React from "react";
import { convertQueryString, getToken } from "../../../utils";
import {
  BASE_API_URL,
  GET_ALL_REGENCY_INNOVATE,
} from "../../../constans/constans";
import { useQuery } from "react-query";
import { getAllRegencyInnovate } from "../../../services/Report/RegencyInnovate/regencyInnovate";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { useUtilContexts } from "../../../context/Utils";
import Button from "../../../components/Button";
import FilterOption from "../../../components/FilterOption";
import { BiDownload, BiSearch } from "react-icons/bi";
import SelectOption from "../../../components/SelectOption";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  predikat: "semua",
  pemda_id: null,
};

const initialParamsOPD = {
  limit: 20,
  page: 1,
  q: "",
};

const predikat = [
  {
    name: "Semua",
    value: "semua",
  },
  {
    name: "Belum Mengisi Data",
    value: "belum mengisi data",
  },
  {
    name: "Kurang Inovatif",
    value: "kurang inovatif",
  },
  {
    name: "Inovatif",
    value: "inovatif",
  },
  {
    name: "Terinovatif",
    value: "terinovatif",
  },
];

const RegencyInnovate = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  const tableHeader = [
    {
      key: "nama_pemda",
      title: "OPD",
    },
    {
      key: "skor",
      title: "skor",
    },
    {
      key: "rangking",
      title: "Ranking",
    },
    {
      key: "predikat",
      title: "Predikat",
    },
    {
      key: "opd_yang_menangani",
      title: "OPD Yang Menangani",
    },
  ];

  const { isLoading, data } = useQuery(
    [GET_ALL_REGENCY_INNOVATE, filterParams],
    getAllRegencyInnovate(filterParams)
  );

  const { setLoadingUtil, snackbar } = useUtilContexts();

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
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

    return {
      options: responseJSON?.data,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

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

  const onHandleOPDChange = (opd) => {
    setSelectedOPD(opd);
    setFilterParams({
      ...filterParams,
      pemda_id: opd.id,
    });
  };

  const resetParams = () => {
    setSelectedOPD(null);
    setFilterParams({
      ...filterParams,
      pemda_id: null,
    });
  };

  const onHandlePredikatChange = (newValue) => {
    setFilterParams({
      ...filterParams,
      predikat: newValue,
    });
  };

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

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl mb-8">
        Indeks Rata-Rata OPD
      </div>

      <div className="flex items-center justify-between w-full space-x-3 whitespace-nowrap">
        <div>Filter</div>
        <FilterOption
          defaultValue="semua"
          items={predikat}
          onFilterChange={onHandlePredikatChange}
        />
        <Button
          text="Unduh Data (XLS)"
          icon={<BiDownload size="16" />}
          padding="p-[10px]"
        />
      </div>

      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex w-[50%] gap-4 items-end">
          <div className="w-[60%]">
            <SelectOption
              label="OPD"
              placeholder="Pilih OPD"
              options={loadOptionOPD}
              onChange={(e) => onHandleOPDChange(e)}
              value={selectedOPD}
              paginate
            />
          </div>
          <button
            onClick={resetParams}
            className="border border-[#333333] px-6 py-2 text-sm rounded"
          >
            Reset OPD
          </button>
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

export default RegencyInnovate;
