import React from "react";

import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";

import SelectOption from "../../../../components/SelectOption";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import {
  findIndicator,
  submitIndicator,
} from "../../../../services/MasterData/indicator";
import {
  GET_INDICATOR,
  formats,
  modules,
  typeList,
} from "../../../../constans/constans";

import "react-quill/dist/quill.snow.css";
import { useUtilContexts } from "../../../../context/Utils";

const FormIndicator = () => {
  const [payload, setPayload] = React.useState({
    no_urut: "",
    jenis_indikator: null,
    nama_indikator: "",
    keterangan: "",
    nama_dokumen_pendukung: "",
    jenis_file: "",
    bobot: "",
    parent: null,
    mandatory: null,
  });
  const [error, setError] = React.useState({});

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id;

  const parents = [
    {
      value: "Visi dan Misi",
      label: "Visi dan Misi",
    },
    {
      value: "Penerapan SIPD (Sistem Informasi Pemerintah)",
      label: "Penerapan SIPD (Sistem Informasi Pemerintah)",
    },
    {
      value: "APBD Tepat Waktu",
      label: "APBD Tepat Waktu",
    },
    {
      value: "Kualitas Peningkatan Perizinan",
      label: "Kualitas Peningkatan Perizinan",
    },
    {
      value: "Jumlah Pendapatan Perkapita",
      label: "Jumlah Pendapatan Perkapita",
    },
    {
      value: "Penurunan Tingkat Pengangguran Terbuka",
      label: "Penurunan Tingkat Pengangguran Terbuka",
    },
    {
      value: "Jumlah Peningkatan Investasi",
      label: "Jumlah Peningkatan Investasi",
    },
    {
      value: "Jumlah Peningkatan PAD",
      label: "Jumlah Peningkatan PAD",
    },
    {
      value: "Opini BPK",
      label: "Opini BPK",
    },
  ];

  const mandatories = [
    {
      value: "Mandatory",
      label: "Mandatory",
    },
    {
      value: "Tidak Mandatory",
      label: "Tidak Mandatory",
    },
  ];

  useQuery([GET_INDICATOR], findIndicator(currentId), {
    enabled: !!currentId,
    onSuccess: (res) => {
      const { data } = res;
      setPayload({
        no_urut : data?.no_urut,
        jenis_indikator : typeList?.find((item) => item.value === data?.jenis_indikator),
        nama_indikator : data?.nama_indikator,
        keterangan : data?.keterangan,
        nama_dokumen_pendukung : data?.nama_dokumen_pendukung,
        jenis_file : data?.jenis_file,
        bobot : data?.bobot,
        parent : parents?.find(item => item.value === data?.parent) ?? null,
        mandatory : mandatories?.find(item => item.value === data?.mandatory) ?? null,
      })
    },
    onError : () => {
      snackbar("Terjadi Kesalahan", () => {}, {type : "error"})
    }
  });

  const submitIndicatorMutation = useMutation(submitIndicator);

  const handleChange = (name, value) => {
    if (value.length > 0 || value?.value?.length > 0) {
      setError({
        ...error,
        [name]: "",
      });
    }
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let isValidPayload = true,
      errorMessage = {};

    Object.keys(payload)?.forEach((key, index) => {
      switch (true) {
        case !payload?.[key]:
          errorMessage[key] = "Harus diisi";
          if (index === Object.keys(payload).length - 1) {
            return (isValidPayload = false);
          }
      }
    });

    if (Object.keys(errorMessage).length === 0) {
      setLoadingUtil(true);
      const body = {
        id: currentId,
        no_urut: payload.no_urut,
        jenis_indikator: payload.jenis_indikator?.value,
        nama_indikator: payload.nama_indikator,
        keterangan: payload?.keterangan,
        nama_dokumen_pendukung: payload?.nama_dokumen_pendukung,
        jenis_file: payload?.jenis_file,
        bobot: payload?.bobot,
        parent: payload?.parent?.value,
        mandatory: payload?.mandatory?.value,
      };

      submitIndicatorMutation.mutate(body, {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar(
              currentId ? "Berhasil diubah" : "Berhasil disimpan",
              () => {
                navigate("/master/indikator");
              }
            );
          }
        },
        onError: () => {
          setLoadingUtil(false);
          snackbar("Terjadi kesalahan", () => {}, "error");
        },
      });
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Indikator</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/indikator">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Indikator
          </span>
        </div>
        <div className="flex items-center gap-[11px]">
          <div className="w-[30%]">
            <TextInput
              label="No urut"
              placeholder="Tulis No urut"
              value={payload.no_urut}
              onChange={(e) => handleChange("no_urut", e.target.value)}
              errorMessage={error?.no_urut}
            />
          </div>
          <div className="w-[35%]">
            <SelectOption
              label="Tipe"
              options={typeList}
              onChange={(value) => handleChange("jenis_indikator", value)}
              value={payload?.jenis_indikator}
              placeholder="Pilih Tipe"
              errorMessage={error?.jenis_indikator}
            />
          </div>
          <div className="w-[35%]">
            <TextInput
              label="Nama Indikator"
              placeholder="Tulis Indikator..."
              onChange={(e) => handleChange("nama_indikator", e.target.value)}
              value={payload?.nama_indikator}
              errorMessage={error?.nama_indikator}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative mb-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Keterangan
          </label>
          <ReactQuill
            theme="snow"
            value={payload.keterangan}
            onChange={(value) => handleChange("keterangan", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
            className={error?.keterangan ? "border border-red-500" : ""}
          />
          <span className="text-xs text-red-600 absolute -bottom-4">
            {error?.keterangan}
          </span>
        </div>
        <TextInput
          label="Nama Dokumen Pendukung"
          placeholder="Tulis Nama Dokumen Pendukung..."
          onChange={(e) =>
            handleChange("nama_dokumen_pendukung", e.target.value)
          }
          value={payload.nama_dokumen_pendukung}
          errorMessage={error?.nama_dokumen_pendukung}
        />
        <div className="flex items-center gap-[11px]">
          <div className="flex-1">
            <TextInput
              label="Jenis File"
              placeholder="Tulis Jenis File..."
              onChange={(e) => handleChange("jenis_file", e.target.value)}
              value={payload.jenis_file}
              errorMessage={error?.jenis_file}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Bobot"
              placeholder="Tulis Bobot..."
              onChange={(e) => handleChange("bobot", e.target.value)}
              value={payload.bobot}
              type="number"
              errorMessage={error?.bobot}
            />
          </div>
        </div>

        <div className="flex items-center gap-[11px]">
          <div className="flex-1">
            <SelectOption
              label="Parent"
              placeholder="Pilih Parent"
              options={parents}
              onChange={(value) => handleChange("parent", value)}
              value={payload.parent}
              errorMessage={error?.parent}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Mandatory"
              placeholder="Pilih Mandatory"
              options={mandatories}
              onChange={(value) => handleChange("mandatory", value)}
              value={payload.mandatory}
              errorMessage={error?.mandatory}
            />
          </div>
        </div>

        <span className="text-sm">
          Last Update by: <b>kepala.badan</b>
        </span>
        <div className="flex items-center gap-4 w-60">
          <div className="flex-1">
            <Button
              onClick={() => handleSubmit()}
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

export default FormIndicator;
