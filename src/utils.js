import {
  APPROVE_ACTION_TABLE,
  DELETE_ACTION_TABLE,
  DOWNLOAD_TABLE,
  EDIT_ACTION_TABLE,
  EXCEL_ACTION_TABLE,
  INDICATOR_ACTION_TABLE,
  PDF_ACTION_TABLE,
  PREVIEW_ACTION_TABLE,
  REJECT_ACTION_TABLE,
  TRANSFER_ACTION_TABLE,
} from "./constants";
import {
  IoMdEye,
  IoMdCloseCircle,
  IoMdCheckmarkCircle,
  IoMdTrash,
} from "react-icons/io";
import {
  AiFillFile,
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillSignal,
} from "react-icons/ai";
import { MdDownloadForOffline, MdEdit } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";
import { RiFolderTransferFill } from "react-icons/ri";
import { BASE_API_URL } from "./constans/constans";

export const actionTable = (actionName) => {
  switch (actionName) {
    case PREVIEW_ACTION_TABLE:
      return <IoMdEye />;

    case APPROVE_ACTION_TABLE:
      return <IoMdCheckmarkCircle />;

    case REJECT_ACTION_TABLE:
      return <IoMdCloseCircle />;

    case DOWNLOAD_TABLE:
      return <MdDownloadForOffline />;

    case PDF_ACTION_TABLE:
      return <AiFillFilePdf />;

    case EXCEL_ACTION_TABLE:
      return <AiFillFileExcel />;

    case EDIT_ACTION_TABLE:
      return <MdEdit />;

    case INDICATOR_ACTION_TABLE:
      return <AiFillSignal />;

    case DELETE_ACTION_TABLE:
      return <IoMdTrash />;

    case TRANSFER_ACTION_TABLE:
      return <RiFolderTransferFill />;

    default:
      return <AiFillFile />;
  }
};

export const convertQueryString = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null)
  );
  return new URLSearchParams(filteredParams).toString();
};

export const getToken = () => {
  return secureLocalStorage.getItem("token");
};

export const getUser = () => {
  return secureLocalStorage.getItem("users");
};

export const downloadFile = (url, fileName) => {
  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.setAttribute("download", fileName);
  aTag.setAttribute("target", "_blank");
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove();
};
