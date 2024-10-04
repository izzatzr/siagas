import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import { useQuery } from "react-query";
import { GET_ALL_ASSESSMENT_TEAM_QUERY_KEY } from "../../../constans/constans";
import { getAllAssessmentTeam } from "../../../services/MasterData/assessmentTeam";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
};

const AssessmentTeam = () => {
  const { setLoadingUtil, snackbar } = useUtilContexts();

  const [filterParams, setFilterParams] = React.useState(initialFilter);

  const tableHeader = [
    { key: "asn_username", title: "USER ASN" },
    { key: "nama", title: "Nama" },
    { key: "instansi", title: "Instansi" },
    { key: "created_by", title: "Dibuat Oleh" },
    { key: "updated_by", title: "Last Update Oleh" },
  ];

  const { data: assessmentTeam, isFetching } = useQuery(
    [GET_ALL_ASSESSMENT_TEAM_QUERY_KEY, filterParams],
    getAllAssessmentTeam(filterParams),
    {
      retry: 0,
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => { }, { type: "error" })
      },
    }
  );

  const onHandleSearch = (value) => {
    if (value.length >= 3) {
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

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Tim Penilaian</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/tim-penilaian/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Tim Penilai
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6 flex items-end justify-between">
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
          data={assessmentTeam?.data || []}
          columns={tableHeader}
        />
        <Pagination
          pageCount={assessmentTeam?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={assessmentTeam?.pagination?.total}
          size={filterParams?.limit}
        />
      </div>
    </div>
  );
};

export default AssessmentTeam;
