import React from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="box-border w-screen h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 h-full overflow-y-scroll flex flex-col">
        {/* Header */}
        <Header />
        <div className="w-full flex-1 bg-[#F3F6FF] p-8">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
