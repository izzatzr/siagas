import React from "react";
import TablePemda from "./components/TablePemda";
import { useQuery } from "react-query";
import { GET_ALL_ARCHIVE } from "../../../constans/constans";
import { getAllArchive } from "../../../services/Dashboard/Archive/archive";
import Button from "../../../components/Button";
import { BiDownload } from "react-icons/bi";
import FilterOption from "../../../components/FilterOption";
import { useUtilContexts } from "../../../context/Utils";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  tahapan: "semua",
  // pemda_id: "",
};

const phases = [
  {
    name: "Semua",
    value: "semua",
  },
  {
    name: "Inisiatif",
    value: "inisiatif",
  },
  {
    name: "Uji Coba",
    value: "uji coba",
  },
  {
    name: "Penerapan",
    value: "penerapan",
  },
];

const Archive = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);

  const { isLoading, data } = useQuery(
    [GET_ALL_ARCHIVE, filterParams],
    getAllArchive(filterParams)
  );
  const { setLoadingUtil } = useUtilContexts();

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandlePhaseChange = (newPhase) => {
    setFilterParams({
      ...filterParams,
      tahapan: newPhase,
    });
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Arsip</div>

      <div className="flex items-center justify-between w-full space-x-3 whitespace-nowrap">
        <div>Filter</div>
        <FilterOption
          defaultValue="semua"
          items={phases}
          onFilterChange={onHandlePhaseChange}
        />
        <Button
          text="Unduh Data (XLS)"
          icon={<BiDownload size="16" />}
          padding="p-[10px]"
        />
      </div>

      <TablePemda
        data={data?.data || []}
        paginationData={data?.pagination}
        onHandlePagination={onHandlePagination}
      />
    </div>
  );
};

export default Archive;
