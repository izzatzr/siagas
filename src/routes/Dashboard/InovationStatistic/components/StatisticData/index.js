import React, { useMemo } from "react";
import SelectOption from "../../../../../components/SelectOption";
import CardGradient from "../../../../../components/CardGradient";
import CardChart from "../../../../../components/CardChart";
import { BiDownload } from "react-icons/bi";
import Chips from "../../../../../components/Chips";
import { useQuery } from "react-query";
import {
  BASE_API_URL,
  GET_ALL_INNOVATION_FORM,
  GET_ALL_INNOVATION_INITIATOR,
  GET_ALL_INNOVATION_STATISTIC,
  GET_ALL_INNOVATION_TYPE,
} from "../../../../../constans/constans";
import { getInnovationStatistic } from "../../../../../services/Dashboard/InnovationStatistic/innovationStatistic";
import { getAllInnovationForm } from "../../../../../services/Report/InnovationForm/innovationForm";
import { convertQueryString, getToken } from "../../../../../utils";
import { getAllInnovationType } from "../../../../../services/Report/InnovationType/innovationType";
import { getAllInnovationInitiator } from "../../../../../services/Report/InnovationInitiator/innovationInitiator";

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

const StatisticData = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  const innovationStatisticQuery = useQuery(
    [GET_ALL_INNOVATION_STATISTIC],
    getInnovationStatistic()
  );
  const innovationFormQuery = useQuery(
    [GET_ALL_INNOVATION_FORM, filterParams],
    getAllInnovationForm(filterParams)
  );
  const innovationTypeQuery = useQuery(
    [GET_ALL_INNOVATION_TYPE, filterParams],
    getAllInnovationType(filterParams)
  );
  const innovationInitiatorQuery = useQuery(
    [GET_ALL_INNOVATION_INITIATOR, filterParams],
    getAllInnovationInitiator(filterParams)
  );

  const innovationFormChart = useMemo(() => {
    const data = innovationFormQuery.data?.data;

    if (!data) return null;

    const labels = data.map((item) => item.bentuk_inovasi);
    const values = data.map((item) => Number(item.total_keseluruhan));

    return {
      labels,
      values,
    };
  }, [innovationFormQuery.data]);

  const innovationTypeChart = useMemo(() => {
    const data = innovationTypeQuery.data?.data;

    if (!data) return null;

    const labels = data.map((item) => item.jenis_inovasi);
    const values = data.map((item) => Number(item.total_keseluruhan));

    return {
      labels,
      values,
    };
  }, [innovationTypeQuery.data]);

  const innovationInitiatorChart = useMemo(() => {
    const data = innovationInitiatorQuery.data?.data;

    if (!data) return null;

    const labels = data.map((item) => item.inisiator_inovasi);
    const values = data.map((item) => Number(item.total_keseluruhan));

    return {
      labels,
      values,
    };
  }, [innovationInitiatorQuery.data]);

  const getOPD = async (search) => {
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
    getOPD("").then((data) => {
      setSelectedOPD(data.data[0]);
      setFilterParams({
        ...filterParams,
        pemda_id: data.data[0].id,
      });
    });
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center w-full py-3">
  //       <AiOutlineLoading
  //         size={30}
  //         color={"#069DD9"}
  //         className="animate-spin"
  //       />
  //     </div>
  //   );
  // }

  const onHandleOPDChange = (opd) => {
    setSelectedOPD(opd);
    setFilterParams({
      ...filterParams,
      pemda_id: opd.id,
    });
  };

  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-4">
      <div className="grid grid-cols-4 gap-6">
        <SelectOption
          label="Pemda"
          placeholder="Pilih Pemda"
          options={loadOptionOPD}
          onChange={(e) => onHandleOPDChange(e)}
          value={selectedOPD}
          paginate
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <CardGradient
          type="primary"
          label="Total Inovasi yang Dilaporkan"
          total={`${innovationStatisticQuery.data?.data.total_inovasi} Inovasi`}
        />
        <CardGradient
          type="primary"
          label="Inisiatif"
          total="26.900 Inovasi"
          showInfoLabel="5.99%"
        />
        <CardGradient
          type="primary"
          label="Uji Coba"
          total={`${innovationStatisticQuery.data?.data.total_penerapan} Inovasi`}
          showInfoLabel="5.48%"
        />
        <CardGradient
          type="primary"
          label="Penerapan"
          total={`${innovationStatisticQuery.data?.data.total_uji_coba} Inovasi`}
          showInfoLabel="5.48%"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CardChart
          label="Bentuk Inovasi"
          labels={innovationFormChart?.labels || ""}
          data={innovationFormChart?.values || []}
        />
        <CardChart
          label="Jenis Inovasi"
          labels={innovationTypeChart?.labels || ""}
          data={innovationTypeChart?.values || []}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CardChart
          label="Inisiator Inovasi"
          labels={innovationInitiatorChart?.labels || ""}
          data={innovationInitiatorChart?.values || []}
        />
        <CardChart
          label="OPD Yang Menangani"
          labels={innovationTypeChart?.labels || ""}
          data={innovationTypeChart?.values || []}
        />
      </div>

      {/* Skor Inovasi */}
      <div className="w-full rounded-lg border border-[#E0E0E0] p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-base text-[#333333]">
            Skor Inovasi
          </span>
          <div className="flex items-center gap-2">
            <BiDownload color="#2F80ED" size={20} />
            <span className="text-sm text-[#2F80ED]">Unduh</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Chips label="Rendah" description="Kurang dari 40" color="#EB5757" />
          <Chips label="Sedang" description="40 - 80" color="#F2C94C" />
          <Chips label="Tinggi" description="Lebih dari 80" color="#27AE60" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm">Jumlah Inovasi</span>
          <div className="grid grid-cols-3">
            <div className="w-full bg-[#EB5757] text-center py-4 text-white">
              <span className="text-sm font-bold">7932</span>
            </div>
            <div className="w-full bg-[#F2C94C] text-center py-4 text-white">
              <span className="text-sm font-bold">7932</span>
            </div>
            <div className="w-full bg-[#27AE60] text-center py-4 text-white">
              <span className="text-sm font-bold">7932</span>
            </div>
          </div>
          <div className="flex justify-between text-[#333333] text-sm">
            <span>0</span>
            <span>7000</span>
            <span>14000</span>
            <span>20000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticData;
