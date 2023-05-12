import React from "react";
import { BiDownload } from "react-icons/bi";
import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";
import SelectOption from "../../../components/SelectOption";

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

const InnovationIndicator = () => {
  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">
        Statistik Indikator Inovasi
      </div>
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="w-40 float-right">
            <Button
              text="Unduh semua"
              icon={<BiDownload size="16" />}
              padding="p-[10px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 p-6 bg-white rounded-lg">
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
          <SelectOption
            label="Pemda"
            placholder="Pilih Pemda"
            options={pemdas}
          />
        </div>
        <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-4">
          <div className="text-[#333333] text-xl font-bold">
            Indikator Daerah
          </div>
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={80} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={65} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={73} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={45} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={60} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={90} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={40} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={65} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={89} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={62} filledValue="26" />
          <ProgressBar label="Regulasi Inovasi Daerah" total="80%" completed={80} filledValue="26" />
        </div>
      </div>
    </div>
  );
};

export default InnovationIndicator;
