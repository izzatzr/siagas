import React from "react";
import SelectOption from "../../../../../components/SelectOption";
import CardGradient from "../../../../../components/CardGradient";
import CardChart from "../../../../../components/CardChart";
import { BiDownload } from "react-icons/bi";
import Chips from "../../../../../components/Chips";

const categories = [
  {
    value: "category 1",
    label: "Category 1",
  },
  {
    value: "category 2",
    label: "Category 2",
  },
  {
    value: "category 3",
    label: "Category 3",
  },
  {
    value: "category 4",
    label: "Category 4",
  },
];

const regions = [
  {
    value: "wilayah 1",
    label: "Wilayah 1",
  },
  {
    value: "wilayah 2",
    label: "Wilayah 2",
  },
  {
    value: "wilayah 3",
    label: "Wilayah 3",
  },
  {
    value: "wilayah 4",
    label: "Wilayah 4",
  },
];

const pemdas = [
  {
    value: "pemda 1",
    label: "Pemda 1",
  },
  {
    value: "pemda 2",
    label: "Pemda 2",
  },
  {
    value: "pemda 3",
    label: "Pemda 3",
  },
  {
    value: "pemda 4",
    label: "Pemda 4",
  },
];

const years = [
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2020",
    label: "2020",
  },
];

const StatisticData = () => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-4">
      <div className="grid grid-cols-4 gap-6">
        <SelectOption
          label="Kategori"
          placholder="Pilih Kategori"
          options={categories}
        />
        <SelectOption
          label="Wilayah"
          placholder="Pilih Wilayah"
          options={regions}
        />
        <SelectOption label="Pemda" placholder="Pilih Pemda" options={pemdas} />
        <SelectOption label="Tahun" placholder="Pilih Tahun" options={years} />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <CardGradient
          type="primary"
          label="Total Inovasi yang Dilaporkan"
          total="26.900 Inovasi"
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
          total="26.900 Inovasi"
          showInfoLabel="5.48%"
        />
        <CardGradient
          type="primary"
          label="Penerapan"
          total="26.900 Inovasi"
          showInfoLabel="5.48%"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CardChart label="Bentuk" />
        <CardChart label="Kategori" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <CardChart label="Jenis" />
        <CardChart label="Inisiator" />
        <CardChart label="Tahun Penerapan" />
      </div>

      {/* Skor Inovasi */}
      <div className="w-full rounded-lg border border-[#E0E0E0] p-4 flex flex-col gap-4">
        <div className="flex w-full justify-between items-center">
          <span className="font-bold text-base text-[#333333]">
            Skor Inovasi
          </span>
          <div className="flex items-center gap-2">
            <BiDownload color="#2F80ED" size={20} />
            <span className="text-sm text-[#2F80ED]">Unduh</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
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
