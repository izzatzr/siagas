import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { getUser } from "../../utils";

const SidebarItem = (props) => {
  const location = useLocation();
  const user = getUser();

  const {
    label,
    icon,
    active,
    children,
    handleOpenAccordion,
    sidebarActive,
    indexSidebar,
    show,
  } = props;

  if (!show) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" />
        <div className="flex-1">
          <span className="font-medium">{label}</span>
        </div>
        {children.length > 0 && (
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-blue-200"
            onClick={() => handleOpenAccordion(label, !active)}
          >
            {active && sidebarActive === indexSidebar ? (
              <AiFillCaretUp size={10} />
            ) : (
              <AiFillCaretDown size={10} />
            )}
          </div>
        )}
      </div>
      {sidebarActive === indexSidebar && active && (
        <div className={`flex flex-col pt-1.5`}>
          {children.map((child, key) => {
            return user?.is_super_admin === "y" &&
              child?.roles?.includes("Super Admin") ? (
              <Link to={child.link} key={key}>
                <div
                  className={`mt-[11px] text-[13px] pl-[37px] rounded py-1.5 hover:text-[#069DD9] cursor-pointer ${
                    location.pathname.includes(child.link) && "text-[#069DD9]"
                  }`}
                >
                  {child.label}
                </div>
              </Link>
            ) : user?.is_super_admin === "t" &&
              child?.roles?.includes("User" || "Admin" || "Pemda") ? (
              <Link to={child.link} key={key}>
                <div
                  className={`mt-[11px] text-[13px] pl-[37px] rounded py-1.5 hover:text-[#069DD9] cursor-pointer ${
                    location.pathname.includes(child.link) && "text-[#069DD9]"
                  }`}
                >
                  {child.label}
                </div>
              </Link>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
