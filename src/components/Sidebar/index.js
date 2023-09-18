import React from "react";

import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";

import { sidebarDataDummy } from "../../constans/constans";
import logo from "../../assets/images/logo.svg";
import SidebarItem from "../SidebarItem";
import { signOut } from "../../redux/actions/auth";
import { getUser } from "../../utils";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = getUser();
  const [sidebarData, setSidebarData] = React.useState(sidebarDataDummy);

  const handleOpenAccordion = (label, active) => {
    const sidebarDataTemp = sidebarData;
    let index = sidebarDataTemp.findIndex((val) => val.label === label);

    sidebarDataTemp.forEach((sidebar, i) => {
      if (i === index) {
        sidebar.active = active;
      } else {
        sidebar.active = false;
      }
    });

    setSidebarData([...sidebarDataTemp]);
  };

  const handleSignOut = () => {
    secureLocalStorage.removeItem("isLoggedIn");
    secureLocalStorage.removeItem("token");

    dispatch(signOut());
  };

  return (
    <div className="min-w-[281px] max-w-[281px] flex flex-col justify-between">
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
      <div className="flex flex-col flex-1 overflow-scroll">
        <div className="flex flex-col w-full gap-6 p-6">
          {sidebarData.map((item, key) => {
            return (
              <SidebarItem
                key={key}
                label={item.label}
                icon={item.icon}
                children={item.children}
                active={item.active}
                show={item.roles.includes(user.name)}
                handleOpenAccordion={handleOpenAccordion}
              />
            );
          })}
        </div>
        <div className="w-full h-px bg-[#EBEFF2]"></div>
        <div className="flex flex-col w-full gap-6 p-6">
          <div
            className="flex gap-2 items-center text-[#BDBDBD] cursor-pointer hover:text-[#069DD9]"
            onClick={handleSignOut}
          >
            <MdLogout />
            <div className="flex-1">
              <span className="font-medium">Keluar</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex items-center bg-white justify-center bottom-0 max-w-[281px] w-full border-t-[1px] border-[#EBEFF2]">
        <div className="text-[#828282] text-[15px] text-center">
          <div className="font-semibold">&copy; 2023 BAPPEDA</div>
          <div className="font-normal">KAB. SORONG</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
