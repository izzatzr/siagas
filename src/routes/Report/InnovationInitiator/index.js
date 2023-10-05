import React from "react";
import {
  BASE_API_URL,
  GET_ALL_INNOVATION_INITIATOR,
} from "../../../constans/constans";
import { useQuery } from "react-query";
import { useUtilContexts } from "../../../context/Utils";
import { convertQueryString, getToken } from "../../../utils";
import SelectOption from "../../../components/SelectOption";
import { BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { getAllInnovationInitiator } from "../../../services/Report/InnovationInitiator/innovationInitiator";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  pemda_id: 0,
};

const initialParamsOPD = {
  limit: 20,
  page: 1,
  q: "",
};

const InnovationInitiator = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  const tableHeader = [
    {
      key: "inisiator_inovasi",
      title: "Nama Inisiator",
    },
    {
      key: "total_disetujui",
      title: "Total Disetujui",
    },
    {
      key: "total_keseluruhan",
      title: "Total Keseluruhan",
    },
  ];

  const { isLoading, data } = useQuery(
    [GET_ALL_INNOVATION_INITIATOR, filterParams],
    getAllInnovationInitiator(filterParams)
  );
  const { setLoadingUtil } = useUtilContexts();

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
        Rekap Berdasarkan Inisiator
      </div>

      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex w-[50%] gap-4 items-end">
          <div className="w-[60%]">
            <SelectOption
              label="Pemda"
              placeholder="Pilih Pemda"
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

export default InnovationInitiator;
