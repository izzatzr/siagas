import React from "react";
import { FiMenu } from "react-icons/fi";
import fullscreenIcon from "../../assets/icons/fullscreen-icon.svg";
import faqIcon from "../../assets/icons/faq-icon.svg";
import { AiFillCaretDown } from "react-icons/ai";
import { getUser } from "../../utils";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const user = getUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSignOut = () => {
    secureLocalStorage.removeItem("isLoggedIn");
    secureLocalStorage.removeItem("token");

    dispatch(signOut());
  };

  return (
    <div className="h-[80px] max-h-[80px] w-full flex justify-between items-center py-5 px-6 shadow-lg">
      <div className="">
        <FiMenu />
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-[42px]">
          <Link to="/faq">
            <img src={faqIcon} alt="faq" className="w-6 h-6" />
          </Link>
        </div>
        <div className="w-px h-full bg-[#E0E0E0]">&nbsp;</div>
        <div className="flex items-center gap-3 relative">
          <div className="flex flex-col">
            <span className="text-base font-bold">{user?.name}</span>
            <span className="text-[11px] text-[#828282] font-medium">
              {user?.name}
            </span>
          </div>
          <AiFillCaretDown size={16} onClick={() => setIsOpen(!isOpen)} />
          {isOpen && (
            <>
              <div
                className="fixed  h-full w-full top-0 left-0 z-10"
                onClick={() => setIsOpen(false)}
              ></div>
              <div
                className="absolute top-full rounded-md px-4 py-3 bg-white shadow-md w-full z-10"
                onBlur={() => setIsOpen(false)}
              >
                <div
                  className="cursor-pointer hover:text-blue-400"
                  onClick={handleSignOut}
                >
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
