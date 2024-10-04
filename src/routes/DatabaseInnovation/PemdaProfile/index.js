import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import Table from "../../../components/Table";
import TableAction from "../../../components/TableAction";
import {
  DOWNLOAD_TABLE,
  EDIT_ACTION_TABLE,
  EXCEL_ACTION_TABLE,
  PDF_ACTION_TABLE,
  PREVIEW_ACTION_TABLE,
} from "../../../constants";
import { downloadExcelBlob, downloadFile, getUser } from "../../../utils";
import { CHECK_USER, GET_ALL_PEMDA_PROFILE } from "../../../constans/constans";
import { useMutation, useQuery } from "react-query";
import {
  getAllPemdaProfiles,
  getDownloadPemdaProfileFile,
  getPaktaIntegritas,
  postPaktaIntegritas,
} from "../../../services/DatabaseInnovation/pemdaProfile";
import { useUtilContexts } from "../../../context/Utils";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Upload from "../../../components/Upload";
import { checkUser } from "../../../services/Auth/login";

const initialParamsPemdaProfiles = {
  page: 1,
  limit: 20,
  daerah: "",
  q: "",
};

const PemdaProfile = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [params, setParams] = React.useState(initialParamsPemdaProfiles);
  const { setLoadingUtil, snackbar } = useUtilContexts();

  const actionTableData = [
    {
      code: PREVIEW_ACTION_TABLE,
      label: "Preview",
      onClick: (item) => {
        navigate(`/profil-pemda/${item.id}/detail`);
      },
    },
    {
      code: PDF_ACTION_TABLE,
      label: "PDF",
      onClick: (item) => {
        if (item?.document) {
          const fullPath = item?.document?.full_path;
          const fileName = item?.document?.name.replace(
            item?.document?.extension,
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
        downloadExcel(item)
      },
    },
    {
      code: DOWNLOAD_TABLE,
      label: "Download Fakta Integritas",
      onClick: () => {
        onHandleDownloadPaktaIntegritas();
      },
    },
    {
      code: EDIT_ACTION_TABLE,
      label: "Edit",
      onClick: (item) => {
        navigate(`/profil-pemda/edit/${item.id}`);
      },
    },
  ];

  const tableHeader = [
    {
      key: "created_by",
      title: "Dibuat Oleh",
    },
    {
      key: "nama_daerah",
      title: "Nama Pemda",
    },

    {
      key: "",
      title: "Input Indikator Spd",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }}>
            <TableAction
              data={[
                {
                  code: EDIT_ACTION_TABLE,
                  onClick: () => {
                    navigate(`/profil-pemda/${item.id}/input-indikator`);
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const { data, isLoading: isLoadingPemdaProfile } = useQuery(
    [GET_ALL_PEMDA_PROFILE, params],
    getAllPemdaProfiles(params)
  );

  const { data: profile } = useQuery([CHECK_USER], checkUser(), {
    enabled: user?.is_super_admin === "t",
  });

  const postPaktaIntegritasMutation = useMutation(postPaktaIntegritas);
  const downloadPaktaIntegritasMutation = useMutation(getPaktaIntegritas);

  const onHandlePagination = (page) => {
    setParams({
      ...params,
      page: page + 1,
    });
  };

  const onHandleSarch = (event) => {
    if (event.key === "Enter") {
      setParams({
        ...params,
        q: event.target.value,
      });
    }
  };

  const onHandleDownloadPaktaIntegritas = () => {
    downloadPaktaIntegritasMutation.mutate(
      {},
      {
        onSuccess: (res) => {
          const fileName = res?.data?.upload?.name.replace(
            res?.data?.upload?.extension,
            ""
          );
          downloadFile(res?.data?.upload?.full_path, fileName);
        },
        onError: () => {
          alert("Download error");
        },
      }
    );
  };

  const onHandleUploadPaktaIntegritas = (e) => {
    const { files } = e.target;

    setLoadingUtil(true);

    postPaktaIntegritasMutation.mutate(
      {
        user_id: profile?.id,
        file: files[0],
      },
      {
        onSuccess: () => {
          alert("Berhasil mengupload");
        },
        onError: () => {
          alert("Gagal mengupload");
        },
        onSettled: () => {
          setLoadingUtil(false);
        },
      }
    );
  };

  const downloadExcel = (item) => {
    downloadExcelBlob({
      api: getDownloadPemdaProfileFile({ id: item?.id, type: "xlsx" }),
      titleFile: `profile-opd-${item?.nama_daerah
        }-${new Date().getTime()}`,
      onError: () => {
        alert("Terjadi kesalahan");
      },
    });
  };

  React.useEffect(() => {
    if (isLoadingPemdaProfile) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoadingPemdaProfile]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Profile Pemda</div>
      {user?.is_super_admin === "t" && (
        <Upload
          label="Pakta Integritas"
          description={"Mohon mengirimkan Pakta Integritas."}
          onChange={onHandleUploadPaktaIntegritas}
        />
      )}
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/profil-pemda/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#063a69] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Pemda Baru
        </Link>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex items-end justify-between">
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Pencarian"
            onKeyDown={onHandleSarch}
          />
        </div>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6">
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={params.limit}
        />
      </div>
    </div>
  );
};

export default PemdaProfile;
