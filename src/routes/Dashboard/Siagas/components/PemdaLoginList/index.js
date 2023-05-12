import React from "react";
import ReactPaginate from "react-paginate";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const PemdaLoginList = () => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-6">
      <span className="text-[20px]">Daftar Pemda yang Login</span>
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
      <div className="w-full">
        <table className="w-full table">
          <thead>
            <tr className="border-b px-4">
              <td className="text-[13px] text-[#717171] font-medium py-3 pl-6">
                No
              </td>
              <td className="text-[13px] text-[#717171] font-medium py-3">
                Pemda
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">1.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">2.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">3.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">4.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">5.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">6.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">7.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">8.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">9.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
            <tr className="border-b text-[#333333] px-4">
              <td className="text-[13px] font-medium py-3 pl-6">10.</td>
              <td className="text-[13px] font-medium py-3 uppercase">
                Lorem ipsum dolor
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center py-[20px] pl-6">
          <span className="trext-[#828282] text-xs">
            Menampilkan 1 sampai 10 dari 48 entri
          </span>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => console.log(page)}
            pageRangeDisplayed={3}
            pageCount={10}
            previousLabel={<BiChevronLeft />}
            renderOnZeroPageCount={null}
            className="flex gap-3 items-center text-xs"
            pageClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            previousClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            nextClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            disabledClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center bg-[#828282] text-white"
            activeClassName="w-[28px] h-[28px] rounded-md border border-[#069DD9] flex justify-center items-center bg-[#069DD9] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PemdaLoginList;
