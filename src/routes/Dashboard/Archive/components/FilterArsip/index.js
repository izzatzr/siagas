import React from "react";
import { BiDownload } from "react-icons/bi";
import Button from "../../../../../components/Button";
import Chipper from "../../../../../components/Chipper";

const FilterArsip = (props) => {
  const { data, onChangeFilter } = props;
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span>Filter</span>
        {data.map((item) => {
          return (
            <Chipper
              active={item.active}
              label={item.label}
              onClick={() => {
                onChangeFilter(item.value);
              }}
            />
          );
        })}
      </div>
      <div className="">
        <Button
          text="Unduh Data (XLS)"
          icon={<BiDownload size="16" />}
          padding="p-[10px]"
        />
      </div>
    </div>
  );
};

export default FilterArsip;
