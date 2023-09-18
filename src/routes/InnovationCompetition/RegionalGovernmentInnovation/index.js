import React, { useMemo } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import FilterOption from "../../../components/FilterOption";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  GET_ALL_REGIONAL_GOVERNMENT_INNOVATION,
  GET_ALL_REGIONAL_INNOVATION_QUERY_KEY,
} from "../../../constans/constans";
import {
  deleteRegionalGovernmentInnovation,
  getAllRegionalGovernmentInnovation,
} from "../../../services/DatabaseInnovation/RegionalGovernmentInnovation/regionalGovermentInnovation";
import { useUtilContexts } from "../../../context/Utils";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import {
  DELETE_ACTION_TABLE,
  DOCUMENT_ACTION_TABLE,
  EDIT_ACTION_TABLE,
  EXCEL_ACTION_TABLE,
  PDF_ACTION_TABLE,
  TRANSFER_ACTION_TABLE,
} from "../../../constants";
import TableAction from "../../../components/TableAction";
import ModalConfirmation from "../../../components/ModalConfirmation";
import { getAllRegionalInnovation } from "../../../services/DatabaseInnovation/regional";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  tahap: "",
};

const RegionalGovernmentInnovation = () => {
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

  const actionTableData = [
    {
      code: PDF_ACTION_TABLE,
      onClick: () => {
        console.log(PDF_ACTION_TABLE);
      },
    },
    {
      code: EXCEL_ACTION_TABLE,
      onClick: () => {
        console.log(EXCEL_ACTION_TABLE);
      },
    },
    {
      code: TRANSFER_ACTION_TABLE,
      onClick: (item) => {
        navigate(`/inovasi-daerah/${item.id}/indicator`);
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      onClick: (item) => {
        navigate(`/inovasi-daerah/edit/${item.id}`);
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
      <div className="w-full rounded-lg text-[#333333] bg-[#FFC90C4D] p-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AiFillInfoCircle color="#F2994A" />
          <span className="text-base font-medium text-[#333333]">
            Harap diperhatikan!
          </span>
        </div>
        <p className="text-[#333333] text-sm">
          Inovasi Daerah yang dinilai pada sistem indeks inovasi daerah adalah
          inovasi yang telah dilakukan Penerapan dalam kurun waktu maksimal 2
          tahun yaitu 1 Januari 2020 s.d. 31 Desember 2021
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="mr-3">Filter</div>
        <FilterOption items={listFilter} onFilterChange={onHandlePhaseChange} />

        <Link
          to="/inovasi-daerah/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px]"
        >
          <div>
            <BiPlus className="text-base" />
          </div>
          <div style={{ whiteSpace: "nowrap" }}>
            Tambah Inovasi Pemerintah Daerah
          </div>
        </Link>
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
