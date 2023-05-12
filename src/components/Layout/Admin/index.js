import React from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer";
import Loading from "../../Loading";
import { getToken } from "../../../utils";
import { UtilProvider } from "../../../context/Utils";

const AdminLayout = () => {
  console.log(JSON.stringify(getToken()));
  return (
    <UtilProvider>
      <div className="box-border w-screen h-screen flex">
        {/* <Loading loading={false}/> */}
        {/* Sidebar */}
        <Sidebar />
        <div className="flex-1 h-full overflow-y-scroll flex flex-col">
          {/* Header */}
          <Header />
          <div className="w-full flex-1 bg-[#F3F6FF] p-8 relative overflow-scroll h-screen">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </UtilProvider>
  );
};

export default AdminLayout;
