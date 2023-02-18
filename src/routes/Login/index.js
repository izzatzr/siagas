import React from "react";
import Button from "../../components/Button";
import CardLogin from "../../components/CardLogin";
import Checkbox from "../../components/Checkbox";
import TextInput from "../../components/TextInput";

import logo from "../../assets/images/logo.svg";
import sideImage from '../../assets/images/side-image.png'
import announcementLogo from '../../assets/images/announcement.svg'
import { FaEye } from "react-icons/fa";

const Login = () => {
  return (
    <div className="m-0 p-0 flex items-center w-screen h-full">
      <div className=" h-screen">
        <img src={sideImage} alt="side" className="h-screen" />
      </div>
      <div className="flex-1 h-screen flex flex-col py-12 px-[38px]">
        <div className="flex gap-4 h-[56px]">
          <img src={logo} alt="logo" className="w-[53px] h-[56px]" />
          <div className="flex flex-col">
            <span className="font-bold text-[#333333] text-base">SIAGAS</span>
            <span className="text-[#333333] text-base">KABUPATEN SORONG</span>
          </div>
        </div>
        <div className="flex gap-4 w-full mt-12">
          <CardLogin label="Pengumuman" image={announcementLogo} />
          <CardLogin label="Manual Book" image={announcementLogo} />
          <CardLogin label="Petunjuk Teknis" image={announcementLogo} />
        </div>
        <div className="flex mt-[54px] flex-col gap-4 ml-28">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl text-[#333333]">
              Selamat datang
            </span>
            <span className=" text-base text-[#828282]">
              Login dibawah untuk akses akun Anda
            </span>
          </div>
          <div className="w-3/5">
            <TextInput
              label={"Username"}
              name="username"
              placeholder={"Masukan username"}
            />
          </div>
          <div className="w-3/5">
            <TextInput
              label={"Password"}
              name="password"
              placeholder={"Masukan password"}
              icon={<FaEye />}
              type="password"
            />
          </div>
          <Checkbox label="ingatkan saya" />
          ini buat reChapta nunggu GOOGLE SITE KEY
          <div className="w-28">
            <Button text="Masuk" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
