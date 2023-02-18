import React from "react";
import { AiFillCaretDown } from "react-icons/ai";

const SidebarItem = (props) => {
  const { label, icon, active, children } = props;
  console.log(active);
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <img src={icon} alt="" />
        <div className="flex-1">
          <span className="font-medium">{label}</span>
        </div>
        {children.length > 0 && <AiFillCaretDown size={10} className="cursor-pointer" />}
      </div>
      {children.length > 0 && (
        <div className={`${active ? 'flex' : 'hidden'} gap-3 flex-col pl-[37px] cursor-pointer`}>
          {children.map((child, key) => (
            <div className="mt-[11px] text-[13px]" key={key}>
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
