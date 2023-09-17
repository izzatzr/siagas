import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUtilContexts } from "../../../../context/Utils";
import TextInput from "../../../../components/TextInput";
import Checkbox from "../../../../components/Checkbox";
import Upload from "../../../../components/Upload";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import {
  getPemdaProfiles,
  submitPemdaProfil,
} from "../../../../services/DatabaseInnovation/pemdaProfile";
import { getUser } from "../../../../utils";
import { CHECK_USER, GET_PEMDA_PROFILE } from "../../../../constans/constans";
import { checkUser } from "../../../../services/Auth/login";

const initialPayload = {
  nama_pemda: "",
  nama_daerah: "",
  opd_yang_menangani: "",
  alamat_pemda: "",
  email: "",
  no_telpon: "",
  nama_admin: "",
  file: null,
};

const PemdaProfileForm = () => {
  const params = useParams();
  const currentId = params.id;

  const [payload, setPayload] = React.useState(initialPayload);
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  useQuery([CHECK_USER], checkUser(), {
    onSuccess: (res) => {
      setPayload({
        ...payload,
        nama_pemda: res?.nama_pemda,
        email: res?.email,
        nama_admin: res.full_name,
      });
    },
  });

  /** Use Query */
  const { data } = useQuery([GET_PEMDA_PROFILE], getPemdaProfiles(currentId), {
    enabled: !!currentId,
    onSuccess: (res) => {
      const { data, code } = res;
      if (code === 200) {
        setPayload({
          ...payload,
          nama_daerah: data?.nama_daerah,
          nama_pemda: data?.user?.nama_pemda,
          opd_yang_menangani: data?.opd_yang_menangani,
          alamat_pemda: data?.alamat_pemda,
          email: data?.email,
          no_telpon: data?.no_telpon,
          nama_admin: data?.nama_admin,
        });
      }
    },
  });

  const submitPemdaProfilMutation = useMutation(submitPemdaProfil);
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
      file: files[0],
    });
  };

  const onHandleSubmit = () => {
    setLoadingUtil(true);

    let newPayload = {
      nama_pemda: payload?.nama_pemda,
      nama_daerah: payload?.nama_daerah,
      opd_yang_menangani: payload?.opd_yang_menangani,
      alamat_pemda: payload?.alamat_pemda,
      email: payload?.email,
      no_telpon: payload?.no_telpon,
      nama_admin: payload?.nama_admin,
      file: payload?.file,
    };

    for (var key in newPayload) {
      if (newPayload[key] === "" || newPayload[key] === null) {
        delete newPayload[key];
      }
    }

    submitPemdaProfilMutation.mutate(
      {
        id: currentId,
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar(
              currentId ? "Berhasil diubah" : "Berhasil disimpan",
              () => {
                navigate("/profil-pemda");
              }
            );
          }
        },
        onError: () => {
          setLoadingUtil(false);
          snackbar("Terjadi kesalahan", () => {}, "error");
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Profil Pemda</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/profil-pemda">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Pemda
          </span>
        </div>

        <TextInput
          label="Daerah"
          placeholder="Tulis Daerah..."
          onChange={(e) => onHandleChange("nama_daerah", e.target.value)}
          value={payload.nama_daerah}
        />
        <TextInput
          label="Nama Pemda"
          placeholder="Tulis Nama Pemda..."
          onChange={(e) => onHandleChange("nama_pemda", e.target.value)}
          value={payload.nama_pemda}
          disabled={true}
        />

        <div className="flex flex-col gap-4">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            OPD Yang Menangani
          </label>
          <div className="flex gap-6">
            <div
              className={`flex gap-2 p-4 border ${
                payload.opd_yang_menangani === "Badan Litbang" &&
                "border-[#069DD9]"
              }`}
            >
              <Checkbox
                checked={payload.opd_yang_menangani === "Badan Litbang"}
                onChange={() => {
                  onHandleChange("opd_yang_menangani", "Badan Litbang");
                }}
                label="Badan Litbang"
              />
            </div>
            <div
              className={`flex gap-2 p-4 border ${
                payload.opd_yang_menangani === "Bappeda Litbang" &&
                "border-[#069DD9]"
              }`}
            >
              <Checkbox
                checked={payload.opd_yang_menangani === "Bappeda Litbang"}
                onChange={() => {
                  onHandleChange("opd_yang_menangani", "Bappeda Litbang");
                }}
                label="Bappeda Litbang"
              />
            </div>

            <div
              className={`flex gap-2 p-4 border ${
                payload.opd_yang_menangani === "diluar" && "border-[#069DD9]"
              }`}
            >
              <Checkbox
                checked={payload.opd_yang_menangani === "diluar"}
                onChange={() => {
                  onHandleChange("opd_yang_menangani", "diluar");
                }}
                label="Diluar"
              />
            </div>
          </div>
        </div>

        <TextInput
          label="Alamat Pemda"
          placeholder="Tulis Alamat Pemda..."
          onChange={(e) => onHandleChange("alamat_pemda", e.target.value)}
          value={payload.alamat_pemda}
        />

        <TextInput
          label="Email"
          placeholder="Tulis Email..."
          onChange={(e) => onHandleChange("email", e.target.value)}
          value={payload.email}
          disabled={true}
        />

        <TextInput
          type="number"
          label="No. Telepon"
          placeholder="Tulis No. Telepon..."
          onChange={(e) => onHandleChange("no_telpon", e.target.value)}
          value={payload.no_telpon}
        />

        <TextInput
          label="Nama Admin"
          placeholder="Tulis Nama Admin..."
          onChange={(e) => onHandleChange("nama_admin", e.target.value)}
          value={payload.nama_admin}
          disabled={true}
        />

        <Upload
          label="Upload File"
          description={"Dokumen PDF, Maksimal 2MB"}
          onChange={onHandleChangeImage}
          value={payload.file}
        />

        <Link
          className="text-[#333333] text-sm font-normal"
          to={data?.data?.document?.full_path}
          target="_blank"
        >
          Lihat Dokumen
        </Link>

        <div className="flex items-center gap-4 w-60">
          <div className="flex-1">
            <Button
              onClick={onHandleSubmit}
              padding="px-3 py-2"
              text="Simpan"
              icon={<MdCheckCircle />}
            />
          </div>
          <div className="flex-1">
            <Button
              padding="px-3 py-2"
              text="Batal"
              background="#EAEAEA"
              fontColor="#333333"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemdaProfileForm;
