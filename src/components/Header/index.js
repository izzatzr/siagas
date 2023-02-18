import React from "react";
import { FiMenu } from "react-icons/fi";
import fullscreenIcon from '../../assets/icons/fullscreen-icon.svg';
import faqIcon from '../../assets/icons/faq-icon.svg'
import { AiFillCaretDown } from "react-icons/ai";

const Header = () => {
  return (
    <div className="h-[80px] max-h-[80px] w-full flex justify-between items-center py-5 px-6 shadow-lg">
        <div className="">
            <FiMenu />
        </div>
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-[42px]">
                <img src={fullscreenIcon} alt="fullscreen" className="w-6 h-6" />
                <img src={faqIcon} alt="faq" className="w-6 h-6" />
            </div>
            <div className="w-px h-full bg-[#E0E0E0]">&nbsp;</div>
            <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="profile" width={40} height={40} className="rounded-full" />
                <div className="flex flex-col">
                    <span className="font-bold text-base">Kepala.badan</span>
                    <span className="text-[11px] text-[#828282] font-medium">Super Admin</span>
                </div>
                <AiFillCaretDown size={16} />
            </div>
        </div>
    </div>
  );
};

export default Header;
