import React from "react";
import { BiArrowBack, BiUpload } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../../components/TextInput";
import Upload from "../../../../../components/Upload";
import Button from "../../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import {
  // deleteDocumentPemdaProfile,
  getAllDocumentRegionalInnovation,
  uploadDocumentRegionalInnovation,
} from "../../../../../services/DatabaseInnovation/regional";
import { useUtilContexts } from "../../../../../context/Utils";
import { DELETE_ACTION_TABLE, DOWNLOAD_TABLE } from "../../../../../constants";
import TableAction from "../../../../../components/TableAction";
import {
  GET_ALL_DOCUMENT_REGIONAL_INNOVATION_QUERY_KEY,
  GET_INDICATOR,
} from "../../../../../constans/constans";
import Table from "../../../../../components/Table";
import { downloadFile } from "../../../../../utils";
import Pagination from "../../../../../components/Pagination";
import ModalConfirmation from "../../../../../components/ModalConfirmation";
import { findIndicator } from "../../../../../services/MasterData/indicator";

const initialParams = {
  page: 0,
  limit: 20,
};

const InnovationRegionalSupportDocument = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const [filterParams, setFilterParams] = React.useState({
    ...initialParams,
    indicator_id: params.indicator,
    inovasi_id : params?.id
  });
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const actionTableData = [
    {
      code: DELETE_ACTION_TABLE,
      onClick: (item) => {
        setCurrentItem(item);
        setShowDelete(true);
      },
    },
    {
      code: DOWNLOAD_TABLE,
      onClick: (item) => {
        downloadFile(item?.file?.full_path, item?.file?.name);
      },
    },
  ];

  const tableHeader = [
    {
      key: "nomor_surat",
      title: "Nomor Surat",
    },
    {
      title: "Tanggal Surat",
      render: (item) => {
        return item?.tanggal_surat;
      },
    },
    {
      key: "nama_surat",
      title: "Nama Surat",
    },
    {
      key: "form-action",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const [openForm, setOpenForm] = React.useState(false);

  const [payload, setPayload] = React.useState({
    nomor_dokumen: "",
    tanggal_dokumen: "",
    tentang: "",
    dokumen: null,
    indikator_id: params?.indicator,
    inovasi_id : params?.id
  });

  /** Use Query */
  const { data, isFetching, refetch } = useQuery(
    [GET_ALL_DOCUMENT_REGIONAL_INNOVATION_QUERY_KEY, filterParams],
    getAllDocumentRegionalInnovation(filterParams)
  );

  const { data: indicator } = useQuery(
    [GET_INDICATOR],
    findIndicator(params?.indicator),
    {
      enabled: !!params?.indicator,
    }
  );

  const uploadSupportDocumentMutation = useMutation(uploadDocumentRegionalInnovation);
  // const deleteSupportDocumentMutation = useMutation(deleteDocumentPemdaProfile);

  /** End Use Query */

  const onHandleChange = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const onHandleChangeImage = (e) => {
    const { files } = e.target;

    setPayload({
      ...payload,
      dokumen: files[0],
    });
  };

  const onHandleSubmit = () => {
    setLoadingUtil(true);
    uploadSupportDocumentMutation.mutate(payload, {
      onSuccess: (res) => {
        if (res.code === 200) {
          setLoadingUtil(false);
          setOpenForm(false);
          snackbar("Berhasil disimpan", () => {
            refetch();
          });
        }
      },
    });
  };

  const onHandleCloseForm = () => {
    setPayload({
      nomor_dokumen: "",
      tanggal_dokumen: "",
      tentang: "",
      dokumen: "",
    });

    setOpenForm(false);
  };

  const onHandleDeleteDocumentPemdaProfile = () => {
    setShowDelete(false);
    setLoadingUtil(true);

    // deleteSupportDocumentMutation.mutate(
    //   {
    //     pemda_indikator_id: params.indicator,
    //     file_id: currentItem?.file?.id,
    //   },
    //   {
    //     onSuccess: (res) => {
    //       if (res) {
    //         setLoadingUtil(false);
    //         snackbar("File dokumen berhasil dihapus", () => {
    //           refetch();
    //         });
    //       }
    //     },
    //   }
    // );
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <>
      {openForm && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
          <div
            className="absolute w-full h-full bg-black/20"
            onClick={onHandleCloseForm}
          ></div>
          <div className="z-10 flex flex-col gap-6 p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between w-[607px]">
              <div className="text-[#333333] text-xl font-bold">
                Upload Dokumen Pendukung
              </div>

              <div
                className="font-bold text-[#BDBDBD] cursor-pointer"
                onClick={onHandleCloseForm}
              >
                Tutup
              </div>
            </div>
            <TextInput
              label="Nomor Surat / Dokumen"
              placeholder="Tulis"
              onChange={(e) => {
                onHandleChange("nomor_dokumen", e.target.value);
              }}
              value={payload?.nomor_dokumen}
            />
            <TextInput
              placeholder="Tanggal"
              onChange={(e) => {
                onHandleChange("tanggal_dokumen", e.target.value);
              }}
              value={payload.tanggal_dokumen}
              type={"date"}
            />

            <TextInput
              label="Judul Dokumen"
              placeholder="Tulis"
              onChange={(e) => {
                onHandleChange("tentang", e.target.value);
              }}
              value={payload?.tentang}
            />

            <Upload
              label="Pilih Dokumen"
              description={"Dokumen PDF, Maksimal 2MB"}
              onChange={onHandleChangeImage}
              value={payload.dokumen}
            />

            <div className="flex items-center gap-4 ml-auto w-60">
              <div className="flex-1">
                <Button
                  onClick={onHandleCloseForm}
                  padding="px-3 py-2"
                  text="Batal"
                  background="#EAEAEA"
                  fontColor="#333333"
                />
              </div>
              <div className="flex-1">
                <Button
                  onClick={onHandleSubmit}
                  padding="px-3 py-2"
                  text="Simpan"
                  icon={<MdCheckCircle />}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col w-full gap-6 py-6">
        {showDelete && (
          <ModalConfirmation
            variant="delete"
            message="Apakah Anda yakin ingin menghapus ?"
            onCancel={() => setShowDelete(false)}
            onConfirm={onHandleDeleteDocumentPemdaProfile}
          />
        )}
        <div className="text-[#333333] text-2xl">Profile Pemda</div>
        <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
          <div className="flex items-center gap-2">
            <Link to={location?.state?.urlBefore}>
              <BiArrowBack />
            </Link>
            <span className="text-lg font-medium">Dokumen Pendukung</span>
          </div>
          <div className="flex flex-col gap-3 text-[#333333]">
            <div className="text-lg font-bold">
              {indicator?.data?.nama_indikator}
            </div>
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{ __html: indicator?.data?.keterangan }}
            ></div>
          </div>

          <button
            className="flex gap-2 bg-[#069DD9] rounded-lg px-4 py-2 items-center text-white w-28 ml-auto"
            onClick={() => {
              setOpenForm(true);
            }}
          >
            <BiUpload />
            Upload
          </button>

          <Table showNum={true} data={data?.data || []} columns={tableHeader} />
          <Pagination
            pageCount={data?.pagination?.pages}
            onHandlePagination={onHandlePagination}
            totalData={data?.pagination?.total}
            size={filterParams.limit}
          />
        </div>
      </div>
    </>
  );
};

export default InnovationRegionalSupportDocument;
