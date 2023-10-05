import React from "react";
import Slider from "react-slick";
import parse from "html-react-parser";

import announcementImage from "../../../../../assets/images/announcement.svg";
import { BiDownload } from "react-icons/bi";
import pdfFile from "../../../../../assets/test-mb.pdf";
import { useQuery } from "react-query";
import { GET_ALL_ANNOUNCEMENT } from "../../../../../constans/constans";
import { getAllAnnouncement } from "../../../../../services/MasterData/announcement";
import { formatDate } from "../../../../../helpers/formatDate";

const CarouselItem = ({ title, content, date, filePath }) => {
  return (
    <div className="w-full px-2">
      <div className="flex flex-col gap-4 p-6 bg-white rounded-lg">
        <div className="flex gap-3 items-center text-[#333333] font-bold">
          <img src={announcementImage} alt="" width={24} height={24} />
          {title}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#828282] text-sm">{formatDate(date)}</span>
          <p className="text-[#333333]">{parse(content)}</p>
        </div>
        <a
          href={filePath}
          target="_blank"
          download
          className="flex items-center gap-2"
          rel="noreferrer"
        >
          <BiDownload color="#2F80ED" size={20} />
          <span className="text-sm text-[#2F80ED]">Unduh Dokumen</span>
        </a>
      </div>
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
};

const initialParams = {
  page: 1,
  limit: 20,
  q: "",
  category: "",
};

const AnnouncementCarousel = () => {
  const { data: announcements } = useQuery(
    [GET_ALL_ANNOUNCEMENT],
    getAllAnnouncement(initialParams)
  );

  return (
    <Slider {...settings} className="mb-8">
      {announcements?.data.map((announcement) => (
        <CarouselItem
          key={announcement.id}
          title={announcement.title}
          content={announcement.content}
          date={announcement.updated_at}
          filePath={announcement.file.full_path}
        />
      ))}
    </Slider>
  );
};

export default AnnouncementCarousel;
