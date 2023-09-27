import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";

const GuesLayout = () => {
  return (
    <div className="box-border flex flex-col w-screen h-screen">
      <Navbar />
      <div className="bg-[#063a69] [flex-1 w-full px-24 py-12 bg-cover h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default GuesLayout;
