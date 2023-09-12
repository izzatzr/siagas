import React from "react";
import {
  BiPlus,
  BiSearch,
} from "react-icons/bi";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import {
  EDIT_ACTION_TABLE,
  EXCEL_ACTION_TABLE,
  PDF_ACTION_TABLE,
  PREVIEW_ACTION_TABLE,
} from "../../../constants";
import { convertQueryString, getToken } from "../../../utils";
import {
  BASE_API_URL,
  GET_ALL_PEMDA_PROFILE,
} from "../../../constans/constans";
import { useQuery } from "react-query";
import { getAllPemdaProfiles } from "../../../services/DatabaseInnovation/pemdaProfile";
import { useUtilContexts } from "../../../context/Utils";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

const initialParamsRegion = {
  page: 1,
  limit: 20,
  name: "",
};

const initialParamsPemdaProfiles = {
  page: 1,
  limit: 20,
  daerah: "",
  q: "",
};

const PemdaProfile = () => {
  const navigate = useNavigate();
  const [params, setParams] = React.useState(initialParamsPemdaProfiles);
  const { setLoadingUtil, snackbar } = useUtilContexts();

  const actionTableData = [
    {
      code: PREVIEW_ACTION_TABLE,
      onClick: (item) => {
        navigate(`/profil-pemda/${item.id}/detail`);
      },
    },
    {
      code: PDF_ACTION_TABLE,
      onClick: () => {
        console.log(PDF_ACTION_TABLE);
      },
    },
    {
      code: EXCEL_ACTION_TABLE,
      onClick: () => {
        console.log(EDIT_ACTION_TABLE);
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      onClick: (item) => {
        navigate(`/profil-pemda/edit/${item.id}`);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nama_daerah",
      title: "Nama Pemda",
    },
    {
      key: "",
      title: "Input Indikator Spd",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }}>
            <TableAction
              data={[
                {
                  code: EDIT_ACTION_TABLE,
                  onClick: () => {
                    navigate(`/profil-pemda/${item.id}/input-indikator`);
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const loadOptionRegions = async (search, loadedOptions, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialParamsRegion,
      name: search,
    });
    const response = await fetch(
      `${BASE_API_URL}/daerah?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const responseJSON = await response.json();

    return {
      options: responseJSON?.data,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

  const { data, isLoading: isLoadingPemdaProfile } = useQuery(
    [GET_ALL_PEMDA_PROFILE, params],
    getAllPemdaProfiles(params)
  );

  const onHandlePagination = (page) => {
    setParams({
      ...params,
      page: page + 1,
    });
  };

  const onHandleSarch = (event) => {
    if (event.key === "Enter") {
      setParams({
        ...params,
        q: event.target.value,
      });
    }
  };

  React.useEffect(() => {
    if (isLoadingPemdaProfile) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoadingPemdaProfile]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Profile Pemda</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/profil-pemda/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Pemda Baru
        </Link>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Pencarian"
            onKeyDown={onHandleSarch}
          />
        </div>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={params.limit}
        />
      </div>
    </div>
  );
};

export default PemdaProfile;
