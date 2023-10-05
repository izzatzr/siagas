import React from "react";
import AnnouncementCarousel from "./components/AnnouncementCarousel";
import CardGradient from "../../../components/CardGradient";
import DailyLogin from "./components/DailyLogin";
import InnovationMap from "./components/InnovationMap";
import PemdaLoginList from "./components/PemdaLoginList";
import RegionData from "./components/RegionData";

const Siagas = () => {
  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Dashboard SIAGAS</div>
      <div className="flex flex-col gap-6">
        <AnnouncementCarousel />
        <CardGradient
          showInfo={true}
          type="primary"
          label="Indeks Rata-Rata"
          total={48.05}
        />
        <div className="grid grid-cols-2 gap-4">
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Uji Coba"
            total={1.61}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Penerapan"
            total={1.477}
          />
        </div>
        <CardGradient
          type="secondary"
          label="Total Inovasi Nasional"
          total={1.61}
        />
        <div className="grid grid-cols-2 gap-4">
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Tertinggi"
            total={1.61}
          />
          <CardGradient
            showInfo={true}
            type="secondary"
            label="Skor Terendah"
            total={1.477}
          />
        </div>
      </div>
    </div>
  );
};

export default Siagas;
