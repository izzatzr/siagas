import React from "react";
import { BiDownload } from "react-icons/bi";

const RegionData = () => {
  const tableHeader = [
    {
      label: "No",
    },
    {
      label: "Daerah",
    },
    {
      label: "Jumlah Inovasi",
    },
    {
      label: "Jumlah Vidio",
    },
    {
      label: "Aksi",
    },
  ];

  const dataTables = [
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
    {
      region: "LOREM IPSUM DOLOR",
      innovationTotal: 210,
      videoTotal: 210,
    },
  ];

  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-6">
      <span className="text-[20px]">Data Daerah</span>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-[66%]">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="" className="text-xs">
              Tanggal
            </label>
            <select
              name=""
              id=""
              className=" border border-[#333333] px-3 py-2 rounded-sm"
            >
              <option value="" disabled>
                Pilih Tanggal
              </option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
              <option value="2023-04-03">2023-04-03</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="" className="text-xs">
              Klaster
            </label>
            <select
              name=""
              id=""
              className=" border border-[#333333] px-3 py-2 rounded-sm"
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
        </div>
        <button className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5">
            <BiDownload className="text-base" />
            Unduh Semua
        </button>
      </div>
      <table className="w-full table">
        <thead>
          <tr className="border-b px-4">
            {tableHeader.map((title, index) => (
              <td
                className={`text-[13px] text-[#717171] font-medium py-3 ${
                  index = 0 && "pl-6"
                }
                ${(index === 2 || index === 3) && "text-center"}
                ${index === 4 && "text-right pr-12"}`}
                key={index}
              >
                {title.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataTables.map((item, index) => (
            <tr className="border-b text-[#333333] px-4" key={index}>
              <td className="text-[13px] font-medium py-3 pl-6">{index + 1}</td>
              <td className="text-[13px] font-medium py-3 uppercase w-96">
                {item.region}
              </td>
              <td className="text-[13px] font-medium py-3 uppercase text-center">
                {item.innovationTotal}
              </td>
              <td className="text-[13px] font-medium py-3 uppercase text-center">
                {item.videoTotal}
              </td>
              <td className="text-[13px] font-medium py-3 uppercase pr-12 float-right">
                <div className="flex items-center gap-2 cursor-pointer">
                  <BiDownload color="#069DD9" size={20} />
                  <span className="text-sm capitalize text-[#069DD9]">
                    Unduh
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionData;
