import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";

const GuesLayout = () => {
  return (
    <div className="box-border w-screen h-screen flex flex-col">
      <Navbar />
      <div className="bg-[url('../src/assets/images/side-image.png')] bg-cover px-24 w-full py-8 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default GuesLayout;
