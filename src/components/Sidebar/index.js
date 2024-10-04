import React from "react";

import { sidebarDataDummy } from "../../constans/constans";
import logo from "../../assets/images/logo.png";
import SidebarItem from "../SidebarItem";
import { getUser } from "../../utils";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const user = getUser();
  const [sidebarData, setSidebarData] = React.useState(sidebarDataDummy);
  const [sidebarActive, setSidebarActive] = React.useState(0);

  const handleOpenAccordion = (label, active) => {
    const sidebarDataTemp = sidebarData;
    let index = sidebarDataTemp.findIndex((val) => val.label === label);

    sidebarDataTemp.forEach((sidebar, i) => {
      if (i === index) {
        sidebar.active = active;
        setSidebarActive(i);
      } else {
        sidebar.active = false;
      }
    });

    setSidebarData([...sidebarDataTemp]);
  };



  React.useEffect(() => {
    let sidebarTemp = sidebarDataDummy;

    sidebarTemp.forEach((sidebar, index) => {
      const childIndex = sidebar.children.findIndex((item) =>
        location.pathname.includes(item.link)
      );

      if (childIndex > 0) {
        sidebar.active = true;
        setSidebarActive(index);
      }
    });

    setSidebarData(sidebarTemp);
  }, []);

  return (
    <div className="min-w-[281px] max-w-[281px] flex flex-col justify-between">
      {/* Header sidebar */}
      <div className="flex gap-4 p-6" style={{ backgroundColor: '#063a69' }}>
        <img src={logo} alt="logo" className="w-[35px] h-[37px]" />
        <div className="flex flex-col" style={{ backgroundColor: '#063a69' }}>
          <span className="font-bold text-white text-xs">SIAGAS</span>
          <span className="text-white text-xs">KABUPATEN SORONG</span>
        </div>
      </div>
      <div className="w-full h-px bg-[#EBEFF2]"></div>
      {/* Body sidebar */}
      <div className="flex flex-col flex-1 overflow-scroll" style={{ backgroundColor: '#063a69' }}>
        <div className="flex flex-col w-full gap-6 p-6">
          {sidebarData.map((item, key) => {
            return (
              <SidebarItem
                indexSidebar={key}
                sidebarActive={sidebarActive}
                key={key}
                label={item.label}
                icon={item.icon}
                children={item.children}
                active={item.active}
                show={item?.roles.includes(user?.name)}
                handleOpenAccordion={handleOpenAccordion}
              />
            );
          })}
        </div>
        <div className="w-full h-px bg-[#EBEFF2]"></div>
      </div>
      <div className="p-6 flex items-center justify-center bottom-0 max-w-[281px] w-full border-t-[1px] border-[#EBEFF2]" style={{ backgroundColor: '#063a69' }}>
        <div className="text-[#828282] text-[15px] text-center">
          <div className="font-semibold text-white">&copy; {new Date().getFullYear()} BAPPEDA</div>
          <div className="font-normal text-white">KAB. SORONG</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
