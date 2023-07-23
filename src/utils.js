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
} from "./constants";
import { IoMdEye, IoMdCloseCircle, IoMdCheckmarkCircle, IoMdTrash } from "react-icons/io";
import {
  AiFillFile,
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillSignal,
} from "react-icons/ai";
import { MdDownloadForOffline, MdEdit } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";

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

    default:
      return <AiFillFile />;
  }
};

export const convertQueryString = (params) => {
  return new URLSearchParams(params).toString();
};

export const getToken = () => {
  return secureLocalStorage.getItem("token");
};

export const getUser = () => {
  return secureLocalStorage.getItem('users')
}
