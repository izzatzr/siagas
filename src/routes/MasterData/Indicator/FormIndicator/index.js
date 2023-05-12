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
import { GET_INDICATOR } from "../../../../constans/constans";

import "react-quill/dist/quill.snow.css";

const FormIndicator = () => {
  const [payload, setPayload] = React.useState({
    no_urut: "",
    tipe: {},
    indikator: "",
    deskripsi: "",
    data_pendukung: "",
    jenis_file: "",
    bentuk_dokumen: {},
    format_file: "",
    bobot: "",
    jenis: {},
    group: {},
    parent: {},
    sub: "",
    mandatory: {},
  });
  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id;

  const types = [
    {
      value: "Satuan Pemerintah Daerah",
      label: "Satuan Pemerintah Daerah",
    },
    {
      value: "Satuan Inovasi",
      label: "Satuan Inovasi",
    },
    {
      value: "Indikator Validasi",
      label: "Indikator Validasi",
    },
    {
      value: "Indikator Presentasi Kepala Daerah",
      label: "Indikator Presentasi Kepala Daerah",
    },
  ];

  const documentForms = [
    {
      value: "Umum",
      label: "Umum",
    },
    {
      value: "Resmi",
      label: "Resmi",
    },

    {
      value: "Video",
      label: "Video",
    },
    {
      value: "Foto",
      label: "Foto",
    },
    {
      value: "URL",
      label: "URL",
    },
  ];

  const documentTypes = [
    {
      value: "Visi dan Misi",
      label: "Visi dan Misi",
    },
    {
      value: "Kuantitatif",
      label: "Kuantitatif",
    },

    {
      value: "Kualitatif",
      label: "Kualitatif",
    },
    {
      value: "Pilihan",
      label: "Pilihan",
    },
    {
      value: "Progress",
      label: "Progress",
    },
    {
      value: "T2 - T1",
      label: "T2 - T1",
    },
    {
      value: "(T2 - T1) dibagi T1 dikalikan 100%",
      label: "(T2 - T1) dibagi T1 dikalikan 100%",
    },
    {
      value: "(T2 - T1) * -1",
      label: "(T2 - T1) * -1",
    },
    {
      value: "T1 - T2",
      label: "T1 - T2",
    },
    {
      value: "Upload Video dan Kolom URL",
      label: "Upload Video dan Kolom URL",
    },
    {
      value: "Upload Foto",
      label: "Upload Foto",
    },
    {
      value: "Otomatis oleh sistem",
      label: "Otomatis oleh sistem",
    },
  ];

  const groups = [
    {
      value: "Institusi",
      label: "Institusi",
    },
    {
      value: "Sumber Daya Manusia",
      label: "Sumber Daya Manusia",
    },
    {
      value: "Ekosistem Inovasi dan Kajian",
      label: "Ekosistem Inovasi dan Kajian",
    },
    {
      value: "Infrastruktur",
      label: "Infrastruktur",
    },
    {
      value: "Kecanggihan Produk",
      label: "Kecanggihan Produk",
    },
    {
      value: "Kecepatan Bisnis Proses",
      label: "Kecepatan Bisnis Proses",
    },
    {
      value: "Output Pengetahuan dan Teknologi",
      label: "Output Pengetahuan dan Teknologi",
    },
    {
      value: "Jumlah Inovasi dan hasil Kreatif",
      label: "Jumlah Inovasi dan hasil Kreatif",
    },
  ];

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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const { refetch } = useQuery([GET_INDICATOR], findIndicator(currentId), {
    enabled: false,
    onSuccess: (res) => {
      const { data } = res;
      setPayload({
        no_urut: data.serial_number,
        tipe: types.find((type) => type.label === data.type),
        indikator: data.indicator,
        deskripsi: data.description,
        data_pendukung: data.supporting_data,
        jenis_file: data.file_type,
        bentuk_dokumen: documentForms.find(
          (documentForm) => documentForm.label === data.document_form
        ),
        format_file: data.file_format,
        bobot: data.value,
        jenis: documentTypes.find(
          (documentType) => documentType.label === data.indicator_type
        ),
        group: groups.find((group) => group.label === data.group),
        parent: parents.find((parent) => parent.label === data.parent),
        sub: data.sub,
        mandatory: mandatories.find(
          (mandatory) => mandatory.label === data.mandatory
        ),
      });
    },
  });

  React.useEffect(() => {
    if (currentId) {
      refetch();
    }
  }, [currentId]);

  const submitIndicatorMutation = useMutation(submitIndicator);

  const handleChange = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const body = {
      id: currentId,
      no_urut: payload.no_urut,
      tipe: payload.tipe?.value,
      indikator: payload.indikator,
      deskripsi: payload.deskripsi,
      data_pendukung: payload.data_pendukung,
      jenis_file: payload.jenis_file,
      bentuk_dokumen: payload.bentuk_dokumen?.value,
      format_file: payload.format_file,
      bobot: payload.bobot,
      jenis: payload.jenis?.value,
      group: payload.group?.value,
      parent: payload.parent?.value,
      sub: payload.sub,
      mandatory: payload.mandatory?.value,
    };

    submitIndicatorMutation.mutate(body, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          navigate("/master/indikator");
          alert("BERHASIL");
        }
      },
    });
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
            />
          </div>
          <div className="w-[35%]">
            <SelectOption
              label="Tipe"
              placeholder="Pilih tipe"
              options={types}
              onChange={(value) => handleChange("tipe", value)}
              value={payload.tipe}
            />
          </div>
          <div className="w-[35%]">
            <TextInput
              label="Indikator"
              placeholder="Tulis Indikator..."
              onChange={(e) => handleChange("indikator", e.target.value)}
              value={payload.indikator}
            />
          </div>
        </div>
        <div className="">
          <ReactQuill
            theme="snow"
            value={payload.deskripsi}
            onChange={(value) => handleChange("deskripsi", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
          />
        </div>
        <TextInput
          label="Data Pendukung"
          placeholder="Tulis Data Pendukung..."
          onChange={(e) => handleChange("data_pendukung", e.target.value)}
          value={payload.data_pendukung}
        />
        <div className="flex items-center gap-[11px]">
          <div className="flex-1">
            <TextInput
              label="Jenis File"
              placeholder="Tulis Jenis File..."
              onChange={(e) => handleChange("jenis_file", e.target.value)}
              value={payload.jenis_file}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Bentuk Dokumen"
              placeholder="Pilih Bentuk Dokumen"
              options={documentForms}
              onChange={(value) => handleChange("bentuk_dokumen", value)}
              value={payload.bentuk_dokumen}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Format File"
              placeholder="Tulis Format File..."
              onChange={(e) => handleChange("format_file", e.target.value)}
              value={payload.format_file}
            />
          </div>
        </div>

        <div className="flex items-center gap-[11px]">
          <div className="flex-1">
            <TextInput
              label="Bobot"
              placeholder="Tulis Bobot..."
              onChange={(e) => handleChange("bobot", e.target.value)}
              value={payload.bobot}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Jenis"
              placeholder="Pilih Jenis"
              options={documentTypes}
              onChange={(value) => handleChange("jenis", value)}
              value={payload.jenis}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Group"
              placeholder="Pilih Group"
              options={groups}
              onChange={(value) => handleChange("group", value)}
              value={payload.group}
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
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Subs"
              placeholder="Tulis Subs..."
              onChange={(e) => handleChange("sub", e.target.value)}
              value={payload.sub}
            />
          </div>
          <div className="flex-1">
            <SelectOption
              label="Mandatory"
              placeholder="Pilih Mandatory"
              options={mandatories}
              onChange={(value) => handleChange("mandatory", value)}
              value={payload.mandatory}
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
