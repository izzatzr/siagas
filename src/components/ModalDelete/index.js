import React from "react";
import { BsTrash } from "react-icons/bs";

const ModalDelete = ({doDelete, cancelDelete}) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/20">
      <div className="bg-white rounded-lg w-[344px] h-[344px] flex justify-center items-center flex-col gap-4">
        <div className="bg-[#FFDADA] rounded-lg p-6">
          <BsTrash className="w-20 h-20 text-[#EB5757]" />
        </div>
        <span className="text-lg font-bold w-[190px] text-center">
          Apakah Anda yakin menghapus ini?
        </span>
        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={doDelete}
            className="p-3 flex items-center gap-[10px] border border-[#EB5757] cursor-pointer text-[#EB5757] rounded-lg font-bold text-sm hover:bg-gray-100"
          >
            Ya Hapus
          </button>
          <button
            onClick={cancelDelete}
            className="p-3 flex items-center gap-[10px] bg-[#069DD9] text-white rounded-lg cursor-pointer font-bold text-sm hover:bg-[#0688d9]"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
