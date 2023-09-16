import React from "react";
import {
  BsCheckCircle,
  BsFillPeopleFill,
  BsTrash,
  BsXCircle,
} from "react-icons/bs";

const ModalConfirmation = ({ message, onConfirm, onCancel, variant }) => {
  const getActionButtonProps = () => {
    switch (variant) {
      case "confirm":
        return {
          text: "Setuju",
          textColor: "white",
          border: "border border-green-500",
          buttonForeground: "text-green-500",
          iconBackground: "bg-green-200",
          iconForeground: "text-green-500",
          Icon: BsCheckCircle,
        };
      case "reject":
        return {
          text: "Tolak",
          textColor: "text-white",
          border: "border border-[#EB5757]",
          buttonForeground: "text-[#EB5757]",
          iconBackground: "bg-[#FFDADA]",
          iconForeground: "text-[#EB5757]",
          Icon: BsXCircle,
        };
      case "delete":
        return {
          text: "Hapus",
          textColor: "text-white",
          border: "border border-[#EB5757]",
          buttonForeground: "text-[#EB5757]",
          iconBackground: "bg-[#FFDADA]",
          iconForeground: "text-[#EB5757]",
          Icon: BsTrash,
        };
      case "option":
        return {
          text: "IYA",
          textColor: "white",
          border: "border border-green-500",
          buttonForeground: "text-green-500",
          iconBackground: "bg-green-200",
          iconForeground: "text-green-500",
          Icon: BsFillPeopleFill,
        };
      default:
        throw new Error(`Unsupported variant: ${variant}`);
    }
  };

  const actionButtonProps = getActionButtonProps();

  return (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen bg-black/20">
      <div className="bg-white rounded-lg w-[344px] h-[344px] flex justify-center items-center flex-col gap-4">
        <div className={`${actionButtonProps.iconBackground} rounded-lg p-6`}>
          {actionButtonProps.Icon && (
            <actionButtonProps.Icon
              className={`w-20 h-20 ${actionButtonProps.iconForeground}`}
            />
          )}
        </div>
        <span className="text-lg font-bold w-[190px] text-center">
          {message}
        </span>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onConfirm}
            className={`p-3 flex items-center gap-[10px] ${actionButtonProps.border} ${actionButtonProps.buttonForeground} rounded-lg cursor-pointer font-bold text-sm hover:bg-gray-100`}
          >
            {actionButtonProps.text}
          </button>
          <button
            onClick={onCancel}
            className={`p-3 flex items-center gap-[10px] ${
              variant === "option" ? "bg-[#EB5757]" : "bg-[#069DD9]"
            } text-white rounded-lg cursor-pointer font-bold text-sm hover:bg-[#db5353]`}
          >
            {variant === "option" ? "TIDAK" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
