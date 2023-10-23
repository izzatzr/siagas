import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import FilterOption from "../../../components/FilterOption";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GET_ALL_REGIONAL_GOVERNMENT_INNOVATION,
  GET_ALL_REGIONAL_INNOVATION_QUERY_KEY,
} from "../../../constans/constans";
import {
  deleteRegionalGovernmentInnovation,
} from "../../../services/DatabaseInnovation/RegionalGovernmentInnovation/regionalGovermentInnovation";
import { useUtilContexts } from "../../../context/Utils";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import {
  DOWNLOAD_TABLE,
  EXCEL_ACTION_TABLE,
  PDF_ACTION_TABLE,
} from "../../../constants";
import TableAction from "../../../components/TableAction";
import ModalConfirmation from "../../../components/ModalConfirmation";
import {
  getAllRegionalInnovation,
  getDownlaodFileRegionalInnovation,
} from "../../../services/DatabaseInnovation/regional";
import { downloadExcelBlob, downloadFile, getUser } from "../../../utils";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  tahap: "",
};

const RegionalGovernmentInnovation = () => {
  const user = getUser();

  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [showDelete, setShowDelete] = React.useState(false);
  const [listFilter, setListFilter] = React.useState([
    {
      name: "Semua",
      value: "",
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
  ]);

  const { isLoading, isFetched, data } = useQuery(
    [filterParams, GET_ALL_REGIONAL_INNOVATION_QUERY_KEY, filterParams],
    getAllRegionalInnovation(filterParams)
  );

  const deleteMutation = useMutation(deleteRegionalGovernmentInnovation);

  const queryClient = useQueryClient();
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const downloadExcel = (item) => {
    downloadExcelBlob({
      api: getDownlaodFileRegionalInnovation({ id: item?.id, type: "xlsx" }),
      titleFile: `Detail-Inovasi-${
        item?.innovation_name
      }-${new Date().getTime()}`,
      onError: () => {
        alert("Terjadi kesalahan");
      },
    });
  };

  const actionTableData = [
    {
      code: DOWNLOAD_TABLE,
      label: "Dokumentasi Foto",
      onClick: (item) => {
        if (item?.fotoFile) {
          const fullPath = item?.fotoFile?.full_path;
          const fileName = item?.fotoFile?.name.replace(
            item?.fotoFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: PDF_ACTION_TABLE,
      label: "Anggaran",
      onClick: (item) => {
        if (item?.budgetFile) {
          const fullPath = item?.budgetFile?.full_path;
          const fileName = item?.budgetFile?.name.replace(
            item?.budgetFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: PDF_ACTION_TABLE,
      label: "Profil Bisnis",
      onClick: (item) => {
        if (item?.profileFile) {
          const fullPath = item?.profileFile?.full_path;
          const fileName = item?.profileFile?.name.replace(
            item?.profileFile?.extension,
            ""
          );
          downloadFile(fullPath, fileName);
        } else {
          alert("Dookumen tidak tersedia");
        }
      },
    },
    {
      code: EXCEL_ACTION_TABLE,
      label: "Excel",
      onClick: (item) => {
        downloadExcel(item);
      },
    },
  ];

  const tableHeader = [
    {
      key: "government_name",
      title: "Dibuat Oleh",
    },
    {
      key: "innovation_name",
      title: "Nama Inovasi",
    },
    {
      key: "innovation_phase",
      title: "Tahapan Inovasi",
      render: (item) => {
        return item.innovation_phase.toUpperCase();
      },
    },
    {
      key: "innovation_initiator",
      title: "Inisiator",
    },
    {
      key: "trial_time",
      title: "Waktu Uji Coba Inovasi",
    },
    {
      key: "implementation_time",
      title: "Waktu Penerapan",
    },
    {
      key: "innovation_phase",
      title: "Estimasi Skor Kematangan",
      render: (item) => {
        switch (item.innovation_phase) {
          case "inisiatif":
            return 3;
          case "uji coba":
            return 6;
          case "penerapan":
            return 9;
          default:
            return "";
        }
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandlePhaseChange = (newPhase) => {
    setFilterParams({
      ...filterParams,
      tahap: newPhase,
    });
  };

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);
    deleteMutation.mutate(currentItem?.id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);
        if (res.code) {
          queryClient.invalidateQueries([
            GET_ALL_REGIONAL_GOVERNMENT_INNOVATION,
          ]);

          snackbar("Berhasil menghapus inovasi masyarakat", () => {
            navigate("/lomba/inovasi-masyarakat");
          });
        }
      },
    });
  };

  const filteredData = useMemo(() => {
    if (data) {
      return data?.data.filter(
        (item) => item.innovation_initiator !== "Masyarakat"
      );
    }
    return [];
  }, [data]);

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="delete"
          message="Apakah Anda yakin ingin menghapus"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <div className="text-[#333333] text-2xl">Inovasi Pemerintah Daerah</div>

      <div className="flex items-center justify-between mt-4">
        <div className="mr-3">Filter</div>
        <FilterOption items={listFilter} onFilterChange={onHandlePhaseChange} />
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex flex-col gap-4">
        <div className="">
          <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%] float-right">
            <BiSearch />
            <input
              type="text"
              className="outline-none"
              placeholder="Pencarian"
            />
          </div>
        </div>
      </div>
      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <Table showNum={true} data={filteredData} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default RegionalGovernmentInnovation;
