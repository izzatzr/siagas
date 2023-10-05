import React from "react";
import announcementIcon from "../../../assets/images/announcement.svg";
import {
  GET_ALL_ANNOUNCEMENT,
  announcementData,
} from "../../../constans/constans";
import { BiDownload } from "react-icons/bi";
import pdfFile from "../../../assets/test-mb.pdf";
import { getAllAnnouncement } from "../../../services/MasterData/announcement";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import { formatDate } from "../../../helpers/formatDate";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
  category: "",
};

const Announcement = () => {
  const { data, isLoading, isError } = useQuery(
    [GET_ALL_ANNOUNCEMENT, initialFilter],
    getAllAnnouncement(initialFilter)
  );

  if (isLoading) {
    return (
      <div className="w-full rounded-xl h-full bg-[#F2F2F2] py-8 px-6 flex flex-col gap-6">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-lg">Sedang mendapatkan data...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl h-full bg-[#F2F2F2] py-8 px-6 flex flex-col gap-6">
      {isError ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-lg">Gagal mendapatkan data pengumuman</h1>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <img
              src={announcementIcon}
              alt="announcement"
              width={48}
              height={48}
            />
            <div className="text-2xl font-bold">Pengumuman</div>
          </div>
          <div className="flex flex-col flex-1 gap-3 overflow-scroll">
            {data?.data.map((announcement, key) => (
              <div className="px-8 py-4 bg-white rounded" key={key}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col max-w-4xl gap-1">
                    <span className="text-sm text-[#333333] font-light">
                      {formatDate(announcement.created_at)}
                    </span>
                    <span className="text-base text-[#333333] font-bold">
                      {parse(announcement.content)}
                    </span>
                  </div>
                  <a
                    href={announcement.file.full_path}
                    download
                    className="flex items-center gap-2"
                  >
                    <BiDownload color="#2F80ED" size={20} />
                    <span className="text-sm text-[#2F80ED]">
                      Unduh Dokumen
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Announcement;
