import React from "react";
import { BiArrowBack, BiUpload } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../../components/TextInput";
import Upload from "../../../../../components/Upload";
import Button from "../../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import {
  deleteDocumentPemdaProfile,
  getAllDocumentPemdaProfile,
  uploadDocumentPemdaProfile,
} from "../../../../../services/DatabaseInnovation/pemdaProfile";
import { useUtilContexts } from "../../../../../context/Utils";
import { DELETE_ACTION_TABLE, DOWNLOAD_TABLE } from "../../../../../constants";
import TableAction from "../../../../../components/TableAction";
import { GET_ALL_DOCUMENT_PEMDA_PROFILE } from "../../../../../constans/constans";
import Table from "../../../../../components/Table";
import { downloadFile } from "../../../../../utils";
import ModalDelete from "../../../../../components/ModalDelete";
import Pagination from "../../../../../components/Pagination";

const initialParams = {
  page: 0,
  limit: 20,
};

const SupportDocument = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const [filterParams, setFilterParams] = React.useState({
    ...initialParams,
    id: params.indicator,
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
    pemda_indikator_id: params?.indicator,
  });

  /** Use Query */
  const { data, isFetching, refetch } = useQuery(
    [GET_ALL_DOCUMENT_PEMDA_PROFILE, filterParams],
    getAllDocumentPemdaProfile(filterParams)
  );

  const uploadSupportDocumentMutation = useMutation(uploadDocumentPemdaProfile);
  const deleteSupportDocumentMutation = useMutation(deleteDocumentPemdaProfile);

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

    deleteSupportDocumentMutation.mutate(
      {
        pemda_indikator_id: params.indicator,
        file_id: currentItem?.file?.id,
      },
      {
        onSuccess: (res) => {
          if (res) {
            setLoadingUtil(false);
            snackbar("File dokumen berhasil dihapus", () => {
              refetch();
            });
          }
        },
      }
    );
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
        <div className="flex items-center justify-center fixed left-0 top-0 bottom-0 right-0 ">
          <div
            className="w-full h-full absolute bg-black/20"
            onClick={onHandleCloseForm}
          ></div>
          <div className="flex flex-col p-6 gap-6 bg-white rounded-lg z-10">
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

            <div className="flex items-center gap-4 w-60 ml-auto">
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
      <div className="w-full flex flex-col gap-6 py-6">
        {showDelete && (
          <ModalDelete
            cancelDelete={() => setShowDelete(false)}
            doDelete={onHandleDeleteDocumentPemdaProfile}
          />
        )}
        <div className="text-[#333333] text-2xl">Profile Pemda</div>
        <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Link to={location?.state?.urlBefore}>
              <BiArrowBack />
            </Link>
            <span className="font-medium text-lg">Dokumen Pendukung</span>
          </div>
          <div className="flex flex-col gap-3 text-[#333333]">
            <div className="text-lg font-bold">
              Visi dan Misi - Dokumen Pendukung
            </div>
            <div className="text-xs">
              {"Rumusan umum dalam RPJMD (Dokumen Tahun Terakhir)"}
            </div>
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

export default SupportDocument;
