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
import { PREVIEW_ACTION_TABLE, REJECT_ACTION_TABLE } from "../../../constants";
import {
  BASE_API_URL,
  GET_ALL_REVIEW_RESULT,
} from "../../../constans/constans";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteReviewResult,
  getAllReviewResult,
  getDownloadReviewResult,
} from "../../../services/IndexRating/ReviewResult/reviewResult";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";
import {
  convertQueryString,
  downloadExcelBlob,
  getToken,
} from "../../../utils";
import { updateRegionalInnovationReview } from "../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { printToPDF } from "../../../helpers/common";

const initialFilter = {
  limit: 20,
  page: 1,
  q: "",
};

const initialPemdaProfileParams = {
  page: 1,
  limit: 10,
  q: "",
};

const ReviewResult = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [selectedOPDProfile, setSelectedOPDProfile] = React.useState(null);
  const [showPreviewModal, setShowPreviewModal] = React.useState(false);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    [GET_ALL_REVIEW_RESULT, filterParams],
    getAllReviewResult(filterParams)
  );

  const actionTableData = [
    {
      code: PREVIEW_ACTION_TABLE,
      label: "Preview",
      onClick: (item) => {
        navigate(`/review-inovasi-daerah/detail/${item.review_inovasi_id}`);
      },
    },
    {
      code: REJECT_ACTION_TABLE,
      label: "Reject",
      onClick: (value) => {
        setCurrentItem(value);
        setShowDelete(true);
      },
    },
  ];

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
      key: "pemda.pemda_name",
      title: "Pemda",
    },
    {
      key: "waktu_penerapan",
      title: "Waktu Penerapan",
    },
    {
      key: "kematangan",
      title: "Kematangan",
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
      key: "",
      title: "Hasil QC",
      render: (item) => {
        return (
          <Button
            text="Preview"
            fontSize="text-xs"
            background="bg-white"
            fontColor="text-black"
            border="border border-black"
            padding="px-4 p-[8px]"
            onClick={() => openModal(item)}
          />
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const openModal = (item) => {
    setCurrentItem(item);
    setShowPreviewModal(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setShowPreviewModal(false);
  };

  const loadPemdaProfiles = async (id, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialPemdaProfileParams,
      page,
    });

    const response = await fetch(
      `${BASE_API_URL}/profil_pemda?${paramsQueryString}`,
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

  const onHandleSearch = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      setFilterParams({
        ...filterParams,
        q: value,
      });
    }
  };

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);
    updateRegionalInnovationReviewMutation.mutate(
      {
        id: currentItem?.review_inovasi_id,
        status: "Rejected",
        skor: currentItem?.skor_verifikasi,
      },
      {
        onSuccess: (res) => {
          setLoadingUtil(false);
          setCurrentItem(null);
          if (res.code) {
            queryClient.invalidateQueries([GET_ALL_REVIEW_RESULT]);

            snackbar("Berhasil ditolak", () => {
              navigate("/review-inovasi-daerah");
            });
          }
        },
      }
    );
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

    let fileName = `hasil-review${
      selectedOPDProfile
        ? `-${selectedOPDProfile?.label?.replaceAll(" ", "_")}`
        : ""
    }-${new Date().getTime()}`;

    downloadExcelBlob({
      api: getDownloadReviewResult(newParams),
      titleFile: fileName,
      onError: () => {
        snackbar("Terjadi Kesalahan", () => {}, "error");
      },
    });
  };

  const onHandleDownloadPDf = () => {
    const columns = [
      "Nomor",
      "Judul",
      "Pemda",
      "Waktu Penerapan",
      "Kematangan",
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
        data?.data?.[i].kematangan,
        data?.data?.[i].skor_verifikasi,
        data?.data?.[i].qc,

      ];
      rows.push(temp);
    }

    let fileName = `hasil-review${
      selectedOPDProfile
        ? `-${selectedOPDProfile?.label?.replaceAll(" ", "_")}`
        : ""
    }-${new Date().getTime()}`;


    printToPDF(columns, rows, fileName, "Table Hasil Review")
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="reject"
          message="Apakah Anda yakin ingin menolak"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <Modal isOpen={showPreviewModal} onClose={closeModal} width="w-2/5">
        <div>
          <h1 className="text-2xl font-semibold">Preview</h1>
        </div>
        <div className="w-full mt-8">
          {currentItem ? (
            <div className="grid grid-cols-2 text-sm gap-y-8">
              <div className="font-medium">Nama Inovasi :</div>
              <div>{currentItem?.judul}</div>
              <div className="font-medium">Nama Pemda :</div>
              <div>{currentItem?.pemda?.pemda_name || "-"}</div>
            </div>
          ) : (
            <div className="text-center">Tidak Ada Data</div>
          )}
        </div>
      </Modal>

      <div className="text-[#333333] text-2xl">Hasil Review Inovasi Daerah</div>
      <div className="flex items-center justify-end gap-2">
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
          onClick={onHandleDownloadPDf}
        >
          <BiDownload className="text-base" />
          Unduh Data (PDF)
        </button>
        <button
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
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
          ranking={true}
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
            activeClassName="w-[28px] h-[28px] rounded-md border border-[#069DD9] flex justify-center items-center bg-[#069DD9] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewResult;
