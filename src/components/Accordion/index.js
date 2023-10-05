import React from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Accordion = ({ label, children, isOpen, toggleAccordion }) => {
  return (
    <div
      className="w-full p-6 bg-white cursor-pointer"
      onClick={toggleAccordion}
    >
      <div className="flex justify-between items-center text-[#069DD9]">
        <span className="text-base font-bold ">{label}</span>
        <div>{isOpen ? <BiCaretUp /> : <BiCaretDown />}</div>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Accordion;
