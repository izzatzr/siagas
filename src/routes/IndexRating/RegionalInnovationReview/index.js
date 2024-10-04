import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiDownload,
  BiSearch,
} from "react-icons/bi";
import ReactPaginate from "react-paginate";
import SelectOption from "../../../components/SelectOption";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import {
  APPROVE_ACTION_TABLE,
  PREVIEW_ACTION_TABLE,
  REJECT_ACTION_TABLE,
} from "../../../constants";
import {
  BASE_API_URL,
  GET_ALL_REGIONAL_INNOVATION_REVIEW,
} from "../../../constans/constans";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  updateRegionalInnovationReview,
  getAllRegionalInnovationReview,
  getDownloadRegionalInnovationReview,
} from "../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";
import {
  actionTable,
  convertQueryString,
  downloadExcelBlob,
  getToken,
} from "../../../utils";
import { printToPDF } from "../../../helpers/common";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
  pemda_id: "",
};

const initialPemdaProfileParams = {
  page: 1,
  limit: 10,
  q: "",
};

const RegionalInnovationReview = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [selectedOPDProfile, setSelectedOPDProfile] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const loadPemdaProfiles = async (id, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialPemdaProfileParams,
      page,
    });

    const response = await fetch(
      `${BASE_API_URL}/profil_pemda${id ? `/${id}` : `?${paramsQueryString}`}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    return await response.json();
  };

  const loadOptionOPDProfile = async (search, loadedOptions, { page }) => {
    const responseJSON = await loadPemdaProfiles(null, { page });
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        label: item?.nama_daerah,
        value: `${item?.nama_daerah}-${item?.id}`,
      });
    });

    return {
      options: results,
      hasMore:
        responseJSON?.pagination?.pages >= 1 &&
        loadedOptions.length < responseJSON?.pagination?.total,
      additional: {
        page: page + 1,
      },
    };
  };

  const updateRegionalInnovationReviewMutation = useMutation(
    updateRegionalInnovationReview
  );

  const { data, isLoading } = useQuery(
    [GET_ALL_REGIONAL_INNOVATION_REVIEW, filterParams],
    getAllRegionalInnovationReview(filterParams)
  );

  const actionTableData = (item) => {
    return [
      {
        code: PREVIEW_ACTION_TABLE,
        label: "Preview",
        onClick: (item) => {
          navigate(`/review-inovasi-daerah/detail/${item.id}`);
        },
      },
      {
        code: APPROVE_ACTION_TABLE,
        show: item?.qc?.toLowerCase() === "pending",
        label: "Accept",
        onClick: (item) => {
          setCurrentItem(item);
          setShowConfirmation(true);
        },
      },
      {
        code: REJECT_ACTION_TABLE,
        show: item?.qc?.toLowerCase() === "pending",
        label: "Reject",
        onClick: (item) => {
          setCurrentItem(item);
          setShowDelete(true);
        },
      },
    ];
  };

  const tableHeader = [
    {
      key: "nomor",
      title: "Nomor",
    },
    {
      key: "judul",
      title: "Judul",
    },
    {
      key: "pemda.nama_pemda",
      title: "Pemda",
    },
    {
      key: "waktu_penerapan",
      title: "Waktu Penerapan",
    },
    {
      key: "skor",
      title: "Skor",
    },
    {
      key: "skor_verifikasi",
      title: "Skor Verifikasi",
    },
    {
      key: "qc",
      title: "QC",
    },
    {
      key: "qc_result",
      title: "Hasil QC",
      render: (data) => {
        return (
          <Button
            text="Preview"
            fontSize="text-xs"
            background="bg-white"
            fontColor="text-black"
            border="border border-black"
            padding="px-4 p-[8px]"
            onClick={() => openModal(data)}
          />
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => (
        <TableAction data={actionTableData(item)} itemData={item} />
      ),
    },
  ];

  const openModal = (item) => {
    setCurrentItem(item);
    setShowPreviewModal(true);
  };

  const closeModal = () => {
    setShowPreviewModal(false);
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleAccept = () => {
    setShowConfirmation(false);
    setLoadingUtil(true);
    updateRegionalInnovationReviewMutation.mutate(
      {
        id: currentItem?.id,
        status: "Accept",
        skor: currentItem?.skor,
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);

          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_REGIONAL_INNOVATION_REVIEW]);

            snackbar("Berhasil menyetujui", () => {
              navigate("/review-inovasi-daerah");
            });
          }
        },
      }
    );
  };

  const onHandleReject = () => {
    setShowDelete(false);
    setLoadingUtil(true);
    updateRegionalInnovationReviewMutation.mutate(
      {
        id: currentItem?.id,
        status: "Rejected",
        skor: currentItem?.skor,
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);
          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_REGIONAL_INNOVATION_REVIEW]);

            snackbar("Berhasil ditolak", () => {
              navigate("/review-inovasi-daerah");
            });
          }
        },
      }
    );
  };

  const onHandleSearch = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      setFilterParams({
        ...filterParams,
        q: value,
      });
    }
  };

  const onHandleOPDProfileChange = (value) => {
    setSelectedOPDProfile(value);
    setFilterParams({
      ...filterParams,
      pemda_id: value.id,
    });
  };

  const resetOPDProfile = () => {
    setSelectedOPDProfile(null);
    setFilterParams({
      ...filterParams,
      pemda_id: "",
    });
  };

  const onHandleDownloadFile = (type) => {
    const newParams = {
      type,
    };

    if (filterParams.pemda_id) {
      newParams["pemda_id"] = filterParams.pemda_id;
    }

    if (filterParams.q) {
      newParams["q"] = filterParams.q;
    }

    let fileName = `review-inovasi-daerah${selectedOPDProfile
        ? `-${selectedOPDProfile?.label?.replaceAll(" ", "_")}`
        : ""
      }-${new Date().getTime()}`;

    downloadExcelBlob({
      api: getDownloadRegionalInnovationReview(newParams),
      titleFile: fileName,
      onError: () => {
        snackbar("Terjadi Kesalahan", () => { }, "error");
      },
    });
  };

  const onHandleDownloadPDf = () => {
    const columns = [
      "Nomor",
      "Judul",
      "Pemda",
      "Waktu Penerapan",
      "Skor",
      "Skor Verifikasi",
      "QC"
    ];
    var rows = [];

    for (let i = 0; i < data?.data?.length; i++) {
      var temp = [
        data?.data?.[i].nomor,
        data?.data?.[i].judul,
        data?.data?.[i].pemda?.nama_pemda,
        data?.data?.[i].waktu_penerapan,
        data?.data?.[i].skor,
        data?.data?.[i].skor_verifikasi,
        data?.data?.[i].qc,

      ];
      rows.push(temp);
    }

    let fileName = `review-inovasi-daerah${selectedOPDProfile
        ? `-${selectedOPDProfile?.label?.replaceAll(" ", "_")}`
        : ""
      }-${new Date().getTime()}`;


    printToPDF(columns, rows, fileName, "Table Review Inovasi Daerah")
  };

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showConfirmation && (
        <ModalConfirmation
          variant="confirm"
          message="Apakah Anda yakin ingin menyetujui"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={onHandleAccept}
        />
      )}

      {showDelete && (
        <ModalConfirmation
          variant="reject"
          message="Apakah Anda yakin ingin menolak"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleReject}
        />
      )}

      <Modal isOpen={showPreviewModal} onClose={closeModal} width="w-2/5">
        <div>
          <h1 className="text-2xl font-semibold">Preview</h1>
        </div>
        <div className="w-full mt-8">
          {currentItem ? (
            <div className="grid grid-cols-3 text-sm gap-y-6 grid-x-2">
              <div className="font-medium">Nama Pemda :</div>
              <div className="col-span-2">{currentItem?.pemda?.nama_pemda}</div>

              <div className="font-medium">Nama Inovasi :</div>
              <div className="col-span-2">{currentItem?.judul}</div>

              <div className="font-medium">Status :</div>
              <div className="col-span-2">{currentItem?.qc || "-"}</div>
            </div>
          ) : (
            <div className="text-center">Tidak Ada Data</div>
          )}
        </div>
      </Modal>

      <div className="text-[#333333] text-2xl">Review Inovasi Daerah</div>
      <div className="flex items-center justify-end gap-2">
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          onClick={onHandleDownloadPDf}
        >
          <BiDownload className="text-base" />
          Unduh Data (PDF)
        </button>
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          onClick={() => {
            onHandleDownloadFile("xlsx");
          }}
        >
          <BiDownload className="text-base" />
          Unduh Data (XLS)
        </button>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex w-[60%] gap-4 items-end">
          <div className="w-[60%]">
            <SelectOption
              label="Tampilkan berdasarkan OPD"
              placeholder="Pilih Opd Profile"
              options={loadOptionOPDProfile}
              onChange={onHandleOPDProfileChange}
              value={selectedOPDProfile}
              paginate
              getOptionLabel={(e) => e.label}
            />
          </div>
          <button
            onClick={resetOPDProfile}
            className="border border-[#333333] px-6 py-2 text-sm rounded"
          >
            Tampilkan Semua
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Pencarian"
            onKeyDown={(e) => {
              onHandleSearch(e);
            }}
          />
        </div>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table
          showNum={true}
          data={data?.data || []}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
        />
        <div className="flex justify-end items-center py-[20px] pl-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<BiChevronRight />}
            onPageChange={(page) => onHandlePagination(page.selected)}
            pageRangeDisplayed={3}
            pageCount={data?.pagination.pages || 0}
            previousLabel={<BiChevronLeft />}
            renderOnZeroPageCount={null}
            className="flex items-center gap-3 text-xs"
            pageClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            previousClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            nextClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center"
            disabledClassName="w-[28px] h-[28px] rounded-md border flex justify-center items-center bg-[#828282] text-white"
            activeClassName="w-[28px] h-[28px] rounded-md border border-[#069DD9] flex justify-center items-center bg-[#063a69] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default RegionalInnovationReview;
