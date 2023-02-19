import React from "react";
import Button from "../Button";

import logo from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <div className=" bg-[#434343] rounded-lg py-6 px-4 flex flex-col gap-6 absolute bottom-[24px] right-6 left-6">
      <div className="font-bold text-[#F2F2F2] text-lg">
        Indeks Inovasi Daerah 2023
      </div>
      <div className="font-normal text-[#F2F2F2] text-base">
        Sistem ini digunakan untuk mengumpulkan seluruh Inovasi Daerah baik itu
        bidang Digital maupun Non Digital yang kemudian akan dilakukan
        pengukuran dan penilaian terhadap masing-masing inovasi yang dikirimkan
        ke Kemendagri.
      </div>
      <div className="bg-[#888888] w-full h-px"></div>
      <div className="flex justify-between items-center">
        <div className="">
          <Button
            text="Petunjuk Teknis"
            padding={"p-[10px]"}
            fontSize={"text-[14px]"}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 text-[#F2F2F2]">
            <img src={logo} alt="logo" className="w-[35px] h-[37px]" />
            <div className="flex flex-col">
              <span className="font-bold text-xs">
                &copy; 2022 BPP Litbang Kemendagri
              </span>
              <span className="text-xs">All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
