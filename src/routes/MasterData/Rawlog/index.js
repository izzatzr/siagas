import React from "react";
import { convertQueryString, getToken } from "../../../utils";
import {
  BASE_API_URL,
  GET_ALL_RAWLOG_QUERY_KEY,
  GET_PEMDA_PROFILE,
} from "../../../constans/constans";
import SelectOption from "../../../components/SelectOption";
import { useUtilContexts } from "../../../context/Utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getPemdaProfiles } from "../../../services/DatabaseInnovation/pemdaProfile";
import { getAllRawlog } from "../../../services/MasterData/rawlog";
import Table from "../../../components/Table";

const initialPemdaProfileParams = {
  page: 1,
  limit: 10,
  q: "",
};

const useGetQuery = () => {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const getItem = ({ data, name }) => {
  const getKeyProperty = () => {
    return name === "urusan_pemerintah"
      ? "urusan_pemerintahan"
      : name === "inisiator"
      ? "inisiator_inovasi"
      : name;
  };

  const tableHeader = [
    {
      key: getKeyProperty(),
      title: `Nama ${name
        ?.split("_")
        .map((item) => item?.charAt(0).toUpperCase() + item?.slice(1))
        .join(" ")}`,
      width: 400,
    },
    {
      key: "total_disetujui",
      title: `Total disetujui`,
    },
  ];

  return (
    <Table
      align="align-top"
      showNum={true}
      data={data || []}
      columns={tableHeader}
      footer={[
        {
          value: "Total Keseluruhan",
          colSpan: 2,
        },
        {
          value: data?.reduce((a, b) => {
            return a + parseInt(b?.total_keseluruhan);
          }, 0),
        },
      ]}
    />
  );
};

const Rawlog = () => {
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();
  const query = useGetQuery();

  const { data } = useQuery(
    [GET_PEMDA_PROFILE, query?.get("pemdaProfile")],
    getPemdaProfiles(query?.get("pemdaProfile")),
    {
      enabled: !!query?.get("pemdaProfile"),
    }
  );

  const { data: rawlogData, isFetching } = useQuery(
    [
      GET_ALL_RAWLOG_QUERY_KEY,
      {
        pemda_id: query?.get("pemdaProfile"),
      },
    ],
    getAllRawlog({
      pemda_id: query?.get("pemdaProfile"),
    }),
    {
      enabled: !!query?.get("pemdaProfile"),
      onError: (error) => {
        snackbar(error?.message || "Terjadi Kesalahan", () => {}, {
          type: "error",
        });
      },
    }
  );

  const loadPemdaProfiles = async (id, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialPemdaProfileParams,
      page,
    });

    const response = await fetch(
      `${BASE_API_URL}/profil_pemda${id ? `/${id}` : `?${paramsQueryString}`}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    return await response.json();
  };

  const loadOptionPemdaProfile = async (search, loadedOptions, { page }) => {
    const responseJSON = await loadPemdaProfiles(null, { page });
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        value: `${item?.nama_daerah}-${item?.id}`,
        label: item?.nama_daerah,
      });
    });

    return {
      options: results,
      hasMore: responseJSON?.pagination?.pages >= 1 && loadedOptions.length < responseJSON?.pagination?.total,
      additional: {
        page: page + 1,
      },
    };
  };

  const onHandleChange = (value) => {
    navigate(`/master/rawlog?pemdaProfile=${value?.id}`);
  };

  const getRawlogName = (name) => {
    return name === "inisiator" || name === "Inisiator"
      ? `Berdasarkan ${name.charAt(0).toUpperCase() + name.slice(1)}`
      : name
          ?.split("_")
          .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
          .join(" ");
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Rawlog</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <SelectOption
          label="Pilih OPD"
          placeholder="Pilih OPD"
          options={loadOptionPemdaProfile}
          paginate={true}
          onChange={onHandleChange}
          value={
            data
              ? {
                  id: data?.data?.id,
                  label: data?.data?.nama_daerah,
                  value: `${data?.data?.nama_daerah}-${data?.data?.id}`,
                }
              : null
          }
          getOptionLabel={(e) => e.label}
        />
      </div>

      {rawlogData &&
        Object.keys(rawlogData?.data)?.map((item, index) => (
          <div key={index}>
            <span className="text-base font-bold">{getRawlogName(item)}</span>
            <div className="w-full bg-white rounded-lg p-2 flex flex-col gap-6 mt-3">
              {getItem({ data: rawlogData?.data?.[item], name: item })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Rawlog;
