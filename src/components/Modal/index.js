import React from "react";
import ModalWrapper from "./ModalWrapper";

const Modal = ({ children, width = "w-[344px]", isOpen, onClose }) => {
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.classList.contains("modal-wrapper")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper onClose={onClose} className="modal-wrapper">
      <div className={`bg-white rounded-lg p-8 ${width}`}>{children}</div>
    </ModalWrapper>
  );
};

export default Modal;
