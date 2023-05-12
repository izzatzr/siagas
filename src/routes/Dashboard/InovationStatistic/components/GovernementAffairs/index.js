import React from "react";
import { BiCaretDown } from "react-icons/bi";
import ProgressBar from "../../../../../components/ProgressBar";

const GovernementAffairs = () => {
  return (
    <div className="w-full rounded-lg flex flex-col gap-4 text-[#333333] bg-white p-4">
      <span className="font-bold text-base text-[#333333]">
        Urusan Pemerintah
      </span>
      <ProgressBar label="KESEHATAN" total="210" completed={70} />
      <ProgressBar label="PENDIDIKAN" total="210" completed={70} />
      <ProgressBar
        label="FUNGSI PENUNJANG LAINNYA SESUAI DENGAN KETENTUAN PERATURAN PERUNDANG-UNDANGAN"
        total="210"
        completed={45}
      />
      <ProgressBar
        label="ADMINISTRASI KEPENDUDUKAN DAN PENCATATAN SIPIL"
        total="210"
        completed={70}
      />
      <ProgressBar
        label="KOMUNIKASI DAN INFORMATIKA"
        total="210"
        completed={60}
      />
      <ProgressBar
        label="PEMBERDAYAAN MSAYARAKAT DAN DESA"
        total="210"
        completed={70}
      />
      <ProgressBar label="PARIWISATA" total="210" completed={80} />
      <ProgressBar label="KEUANGAN" total="210" completed={75} />
      <ProgressBar label="LINGKUNGAN HIDUP" total="210" completed={70} />
      <ProgressBar
        label="KETENTERAMAN, KETERTIBAN UMUM, DAN PERLINDUNGAN MASYARAKAT"
        total="210"
        completed={72}
      />
      <ProgressBar label="PERTANIAN" total="210" completed={30} />
      <ProgressBar label="SOSIAL" total="210" completed={60} />
      <ProgressBar label="PENANAMAN MODAL" total="210" completed={65} />

      <div className="w-full gap-2 text-[#069DD9]">
        <div className="cursor-pointer flex items-center">
          <span>Lihat lebih Banyak</span>
          <BiCaretDown />
        </div>
      </div>
    </div>
  );
};

export default GovernementAffairs;
