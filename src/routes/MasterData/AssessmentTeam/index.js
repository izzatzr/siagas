import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
};

const AssessmentTeam = () => {
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const [filterParams, setFilterParams] = React.useState(initialFilter);

  const onHandleSearch = (value) => {
    if (value.length >= 3) {
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
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Tim Penilaian</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/tim-penilaian/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Penilai
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
    </div>
  );
};

export default AssessmentTeam;
