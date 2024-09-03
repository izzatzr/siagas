import React from "react";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import CardGradient from "../../../components/CardGradient";
import DailyLogin from "./components/DailyLogin";
import InnovationMap from "./components/InnovationMap";
import PemdaLoginList from "./components/PemdaLoginList";
import RegionData from "./components/RegionData";
import { GET_ALL_INNOVATION_STATISTIC } from "../../../constans/constans";
import { getInnovationStatistic } from "../../../services/Dashboard/InnovationStatistic/innovationStatistic";
import { useQuery } from "react-query";

const Siagas = () => {
  const { data } = useQuery(
    [GET_ALL_INNOVATION_STATISTIC],
    getInnovationStatistic()
  );

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Dashboard SIAGAS</div>
      <div className="flex flex-col gap-6">
        <AnnouncementCarousel />
        <CardGradient
          showInfo={true}
          type="primary"
          label="Indeks Rata-Rata"
          total={data?.data.indeks_rata_rata || 0}
        />
        <div className="grid grid-cols-2 gap-4">
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Uji Coba"
            total={data?.data.total_uji_coba || 0}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Penerapan"
            total={data?.data.total_penerapan || 0}
          />
        </div>
        <CardGradient
          type="secondary"
          label="Total Inovasi Daerah"
          total={data?.data.total_inovasi || 0}
        />
        <div className="grid grid-cols-2 gap-4">
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Tertinggi"
            total={data?.data.daerah_inovasi_tertinggi || 0}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Terendah"
            total={data?.data.daerah_inovasi_terendah || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Siagas;
