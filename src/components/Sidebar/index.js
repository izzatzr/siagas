import React from "react";
import logo from "../../assets/images/logo.svg";
import SidebarItem from "../SidebarItem";

// Icons Sidebar
import dashboardIcon from "../../assets/icons/dashboard-icon.svg";
import ratingIndexIcon from "../../assets/icons/index-rating-icon.svg";
import databaseInovationIcon from "../../assets/icons/database-inovation-icon.svg";
import governmentInovateIcon from "../../assets/icons/government-inovate-icon.svg";
import reportIcon from "../../assets/icons/report-icon.svg";
import masterDataIcon from "../../assets/icons/master-data-icon.svg";
import configurationIcon from "../../assets/icons/configuration-icon.svg";
import { MdLogout } from "react-icons/md";
import { sidebarDataDummy } from "../../constans/constans";

const Sidebar = () => {
  return (
    <div className="min-w-[281px] max-w-[281px] flex flex-col">
      {/* Header sidebar */}
      <div className="flex gap-4 p-6">
        <img src={logo} alt="logo" className="w-[35px] h-[37px]" />
        <div className="flex flex-col">
          <span className="font-bold text-[#333333] text-xs">SIAGAS</span>
          <span className="text-[#333333] text-xs">KABUPATEN SORONG</span>
        </div>
      </div>
      <div className="w-full h-px bg-[#EBEFF2]"></div>
      {/* Body sidebar */}
      <div className="w-full flex-1 p-6 flex flex-col gap-6 overflow-scroll">
        {sidebarDataDummy.map((item, key) => (
          <SidebarItem
            key={key}
            label={item.label}
            icon={item.icon}
            children={item.children}
            active={item.active}
          />
        ))}
      </div>
      <div className="w-full h-px bg-[#EBEFF2]"></div>
      <div className="w-full p-6 flex flex-col gap-6">
        <div className="flex gap-2 items-center text-[#BDBDBD]">
          <MdLogout/>
          <div className="flex-1">
            <span className="font-medium">Keluar</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex items-center bg-white justify-center fixed bottom-0 max-w-[281px] w-full border-t-[1px] border-[#EBEFF2]">
        <div className="text-[#828282] text-[15px] text-center">
          <div className="font-semibold">&copy; 2023 BAPPEDA</div>
          <div className="font-normal">KAB. SORONG</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
