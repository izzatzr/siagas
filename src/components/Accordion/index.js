import React from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Accordion = (props) => {
  const { label, isOpen, setIsOpen, children, index } = props;
  return (
    <div className="w-full p-6 bg-white">
      <div className="flex justify-between items-center text-[#069DD9]">
        <span className="text-base font-bold ">{label}</span>
        <div className="cursor-pointer" onClick={() => setIsOpen(index)}>
          {isOpen ? <BiCaretUp /> : <BiCaretDown />}
        </div>
      </div>
      <div className="mt-2">{isOpen && children}</div>
    </div>
  );
};

export default Accordion;
