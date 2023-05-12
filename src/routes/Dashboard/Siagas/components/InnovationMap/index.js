import React from "react";

const InnovationMap = () => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-6">
      <span className="text-[20px]">Peta Inovasi</span>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xs">
          Klaster
        </label>
        <select
          name=""
          id=""
          className="w-[40%] border border-[#333333] px-3 py-2 rounded-sm"
        >
          <option value="" disabled>
            Pilih klaster
          </option>
          <option value="kota">Kota</option>
          <option value="Provinsi">Provinsi</option>
          <option value="Kabupaten">Kabupaten</option>
          <option value="Papua - Papua Barat">Papua - Papua Barat</option>
          <option value="Daerah Perbatasan">Daerah Perbatasan</option>
          <option value="Daerah Tertinggal">Daerah Tertinggal</option>
        </select>
      </div>
      <div className="w-full flex justify-center items-center bg-gray-500 h-80">
        UNTUK MAP
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#EB5757]" />
          <span className="text-[#EB5757] text-xs font-bold">
            Belum Ada Data
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#F2994A]" />
          <span className="text-[#F2994A] text-xs font-bold">
            Kurang Inovatif
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#2D9CDB]" />
          <span className="text-[#2D9CDB] text-xs font-bold">Inovatif</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#219653]" />
          <span className="text-[#219653] text-xs font-bold">
            Sangat Inovatif
          </span>
        </div>
      </div>
    </div>
  );
};

export default InnovationMap;
