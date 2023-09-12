import React from "react";
import { IoMdCheckmarkCircle, IoMdCloudUpload } from "react-icons/io";

const Upload = (props) => {
  const { label, description, value, onChange, name } = props;
  const fileUploadRef = React.useRef(null);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[#333333] text-sm font-normal">
        {label}
      </label>
      <div className="w-full border border-[#E0E0E0] rounded-lg py-6 flex gap-[10px] items-center flex-col">
        <span className="text-sm text-[#828282]">{description}</span>
        <button
          className={`border border-[#069DD9] border-dotted flex gap-3 py-3 items-center justify-center w-[313px] rounded-lg text-[#069DD9] ${
            value && "bg-[#069DD9] text-white"
          }`}
          onClick={() => {
            fileUploadRef?.current?.click();
          }}
        >
          {!value ? <IoMdCloudUpload /> : <IoMdCheckmarkCircle />}

          {value ? "File is Uploaded" : "Upload File"}
        </button>
      </div>
      <input
        ref={fileUploadRef}
        type="file"
        name=""
        className="hidden"
        id=""
        onChange={onChange}
      />
    </div>
  );
};

export default Upload;
