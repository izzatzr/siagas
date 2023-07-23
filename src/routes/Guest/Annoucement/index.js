import React from "react";
import announcementIcon from "../../../assets/images/announcement.svg";
import { announcementData } from "../../../constans/constans";
import { BiDownload } from "react-icons/bi";
import pdfFile from '../../../assets/test-mb.pdf'

const Announcement = () => {
  return (
    <div className="w-full rounded-xl h-full bg-[#F2F2F2] py-8 px-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <img src={announcementIcon} alt="announcement" width={48} height={48} />
        <div className="text-2xl font-bold">Pengumuman</div>
      </div>
      <div className="flex flex-col flex-1 overflow-scroll gap-3">
        {announcementData.map((announcement, key) => (
          <div className="bg-white rounded px-8 py-4" key={key}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#333333] font-light">
                  {announcement.date}
                </span>
                <span className="text-base text-[#333333] font-bold">
                  {announcement.description}
                </span>
              </div>
              <a href={pdfFile} download className="flex items-center gap-2">
                <BiDownload color="#2F80ED" size={20} />
                <span className="text-sm text-[#2F80ED]">Unduh Dokumen</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
