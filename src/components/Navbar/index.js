import React from "react";
import logo from "../../assets/images/logo.png";
import { navbarDataDummy } from "../../constans/constans";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="z-10 flex items-center text-white justify-between w-full px-24 py-6 bg-[#063a69] shadow-lg">
      <div className="flex gap-4">
        <img src={logo} alt="logo" className="w-[53px] h-[56px]" />
        <div className="flex flex-col">
          <span className="text-base font-bold">SIAGAS</span>
          <span className="text-base">KABUPATEN SORONG</span>
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 gap-12">
        {navbarDataDummy.map((navbar, key) => (
          <Link to={navbar.link} key={key}>
            <div
              className={`text-base font-bold hover:text-[#8ac9ff] ${
                location.pathname === navbar.link && "text-[#8ac9ff]"
              }`}
            >
              {navbar.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="">
        <Link to="/login">
          <Button text="Login" background="#ffffff" fontColor="#063a69" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
