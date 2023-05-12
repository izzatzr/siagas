import React from "react";
import Slider from "react-slick";

import announcementImage from "../../../../../assets/images/announcement.svg";
import { BiDownload } from "react-icons/bi";
import pdfFile from '../../../../../assets/test-mb.pdf';

const CarouselItem = () => {
  return (
    <div className="w-full px-2">
      <div className="rounded-lg bg-white flex flex-col gap-4 p-6">
        <div className="flex gap-3 items-center text-[#333333] font-bold">
          <img src={announcementImage} alt="" width={24} height={24} />
          Pengumuman
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#828282] text-sm">16 Agustus 2022</span>
          <p className="text-[#333333] text-base font-bold">
            Radiogram Perpanjangan Batas Akhir Penginputan Indeks Inovasi Daerah
            Tahun 2022
          </p>
        </div>
        <a href={pdfFile} download className="flex items-center gap-2">
          <BiDownload color="#2F80ED" size={20} />
          <span className="text-sm text-[#2F80ED]">Unduh Dokumen</span>
        </a>
      </div>
    </div>
  );
};

const AnnouncementCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
      <CarouselItem />
    </Slider>
  );
};

export default AnnouncementCarousel;
