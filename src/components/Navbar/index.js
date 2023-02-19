import React from "react";
import logo from "../../assets/images/logo.svg";
import { navbarDataDummy } from "../../constans/constans";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="py-6 px-24 w-full flex items-center justify-between shadow-lg">
      <div className="flex gap-4">
        <img src={logo} alt="logo" className="w-[53px] h-[56px]" />
        <div className="flex flex-col">
          <span className="font-bold text-[#333333] text-base">SIAGAS</span>
          <span className="text-[#333333] text-base">KABUPATEN SORONG</span>
        </div>
      </div>
      <div className="flex items-center gap-12 justify-center flex-1 text-[#131313]">
        {navbarDataDummy.map((navbar, key) => (
          <Link to={navbar.link} key={key}>
            <div
              className={`text-base font-bold hover:text-[#2F80ED] ${
                location.pathname === navbar.link && "text-[#2F80ED]"
              }`}
            >
              {navbar.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="">
        <Link to="/login">
          <Button text="Login" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
