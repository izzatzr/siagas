import React from "react";
import InnovationItem from "../InnovationItem";
import { GET_ALL_INNOVATION_STATISTIC } from "../../../../constans/constans";
import { getInnovationStatistic } from "../../../../services/Dashboard/InnovationStatistic/innovationStatistic";
import { useQuery } from "react-query";

const Innovation = () => {
  const { data } = useQuery(
    [GET_ALL_INNOVATION_STATISTIC],
    getInnovationStatistic()
  );

  return (
    <div className="text-white bg-[#063a69] flex flex-col justify-center pt-12 pb-24 items-center">
      <h1 className="pb-12 text-2xl font-bold">
        Data Indeks Inovasi Daerah Tahun 2023
      </h1>

      <div className="flex items-center justify-center w-full pb-8">
        <InnovationItem
          label="Total Inovasi"
          value={data?.data.total_inovasi || 0}
        />
      </div>

      <div className="flex justify-center w-full space-x-8">
        <InnovationItem
          label="Inovasi Baru"
          value={data?.data.total_inisiatif || 0}
        />
        <InnovationItem
          label="Inovasi Uji Coba"
          value={data?.data.total_uji_coba || 0}
        />
        <InnovationItem
          label="Inovasi Penerapan"
          value={data?.data.total_penerapan || 0}
        />
      </div>
    </div>
  );
};

export default Innovation;
