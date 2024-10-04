import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  const { title, linkButton, linkButtonText, search, onSearch } = props;
  return (
    <React.Fragment>
      {title && (
        <div className="text-[#333333] font-medium text-2xl">{title}</div>
      )}
      {linkButton && (
        <div className="flex justify-end items-center gap-2">
          <Link
            to={linkButton}
            className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          >
            <BiPlus className="text-base" />
            {linkButtonText}
          </Link>
        </div>
      )}
      {search && (
        <div className="w-full rounded-lg bg-white py-4 px-6">
          <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
            <BiSearch />
            <input
              type="text"
              className="outline-none"
              placeholder="Pencarian"
              onChange={onSearch}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Toolbar;
