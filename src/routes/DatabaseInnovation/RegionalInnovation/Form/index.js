import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { convertQueryString, getToken } from "../../../../utils";
import {
  BASE_API_URL,
  GET_REGIONAL_INNOVATION_QUERY_KEY,
  formats,
  modules,
} from "../../../../constans/constans";
import SelectOption from "../../../../components/SelectOption";
import TextInput from "../../../../components/TextInput";
import Checkbox from "../../../../components/Checkbox";
import ReactQuill from "react-quill";
import Upload from "../../../../components/Upload";
import { MdCheckCircle } from "react-icons/md";
import Button from "../../../../components/Button";
import { useMutation, useQuery } from "react-query";
import {
  createRegionalInnovation,
  getRegionalInnovation,
} from "../../../../services/DatabaseInnovation/regional";
import { useUtilContexts } from "../../../../context/Utils";
import {
  getAllPemdaProfiles,
  getPemdaProfiles,
} from "../../../../services/DatabaseInnovation/pemdaProfile";

const initialParamsNamaPemda = {
  page: 1,
  limit: 20,
  q: "",
};

const initialParamsBusinessGovernment = {
  page: 1,
  limit: 20,
  nama: "",
};

const initialPayload = {
  nama_pemda: null,
  nama_inovasi: "",
  tahapan_inovasi: "",
  inisiator_inovasi: "",
  jenis_inovasi: "",
  bentuk_inovasi: null,
  tematik: null,
  waktu_uji_coba: "",
  waktu_penerapan: "",
  rancang_bangun: "",
  tujuan: "",
  manfaat: "",
  hasil_inovasi: "",
  urusan_pemerintah: null,
  anggaran_file: null,
  profile_file: null,
};

const regionalInnovationForm = [
  "Inovasi daerah lainnya dengan urusan pemerintahan yang menjadi kewenangan daerah",
  "Inovasi pelayanan publik",
  "Inovasi tata kelola pemerintahan daerah",
];

const tematik = [
  "Digitalisasi layanan pemerintahan",
  "Penanggulangan kemiskinan",
  "Kemudahan investasi",
  "Prioritas aktual presiden",
  "Non tematik",
];

const ChecboxContainer = (props) => {
  const { options, onChange, value, label, type } = props;

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={label} className="text-[#333333] text-sm font-normal">
        {label}
      </label>
      <div className="flex gap-6">
        {(options || []).map((item, index) => {
          return (
            <div
              className={`flex gap-2 p-4 border cursor-pointer hover:border-[#069DD9] ${
                value === item && "border-[#069DD9]"
              }`}
              key={index}
              onClick={() => {
                onChange(type, item);
              }}
            >
              <Checkbox
                checked={value === item}
                onChange={() => {
                  onChange(type, item);
                }}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RegionalInnovationForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const currentId = params.id;

  const [payload, setPayload] = React.useState(initialPayload);

  const loadUrusanPemerintahData = async () => {
    const paramsQueryString = convertQueryString(
      initialParamsBusinessGovernment
    );

    const response = await fetch(
      `${BASE_API_URL}/urusan_pemerintahan?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    return await response.json();
  };

  const { data } = useQuery(
    [GET_REGIONAL_INNOVATION_QUERY_KEY],
    getRegionalInnovation(currentId),
    {
      enabled: !!currentId,
      onSuccess: async (res) => {
        const { data, code } = res;
        if (code === 200) {
          const loadDataPemda = getAllPemdaProfiles();

          const dropdownData = await Promise.all([
            loadDataPemda(),
            loadUrusanPemerintahData(),
          ]);

          const pemdaData = dropdownData[0]?.data?.find(
            (item) => item?.id === data?.pemda_id
          );
          const urusanPemerintahData = dropdownData[1]?.data?.find(
            (item) => item?.id === data?.government_sector_id
          );

          setPayload({
            nama_pemda: {
              id: pemdaData?.id,
              label: pemdaData?.nama_daerah,
              value: `${pemdaData?.nama_daerah}_${pemdaData?.id}`,
            },
            nama_inovasi: data?.innovation_name,
            tahapan_inovasi: data?.innovation_phase,
            inisiator_inovasi: data?.innovation_initiator,
            jenis_inovasi: data?.innovation_type,
            bentuk_inovasi: {
              label : data?.innovation_form,
              value : data?.innovation_form
            },
            tematik: {
              label : data?.thematic,
              value : data?.thematic
            },
            urusan_pemerintah: {
              id: urusanPemerintahData?.id,
              label: urusanPemerintahData?.name,
              value: `${urusanPemerintahData?.name}`,
            },
            waktu_uji_coba : data?.trial_time,
            waktu_penerapan : data?.implementation_time,
            rancang_bangun : data?.design,
            tujuan : data?.purpose,
            manfaat : data?.benefit,
            hasil_inovasi : data?.result
          });
        }
      },
    }
  );

  const submitRegionalInnovationMutation = useMutation(
    createRegionalInnovation
  );

  const loadOptionsPemdaName = async (search, loadedOptions, { page }) => {
    const paramsQueryString = convertQueryString(initialParamsNamaPemda);
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const responseJSON = await response.json();
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        label: item.nama_daerah,
        value: `${item.nama_daerah}_${item.id}`,
      });
    });

    return {
      options: results,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      },
    };
  };

  const getOptionLabelPemdaName = (value) => {
    return value.label;
  };

  const loadedOptionsBusinessGovernment = async (
    search,
    loadedOptions,
    { page }
  ) => {
    const responseJSON = await loadUrusanPemerintahData();
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        label: item.name,
        value: `${item.name}`,
      });
    });

    return {
      options: results,
      hasMore: responseJSON.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      },
    };
  };

  const onHandleChange = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const onHandleChangeImage = (key, e) => {
    const { files } = e.target;

    setPayload({
      ...payload,
      [key]: files[0],
    });
  };

  const onHandleSubmit = () => {
    setLoadingUtil(true);

    const newPayload = {
      ...payload,
      nama_pemda: payload.nama_pemda?.label,
      bentuk_inovasi: payload.bentuk_inovasi?.value,
      tematik: payload.tematik?.value,
      urusan_pemerintah: payload.urusan_pemerintah?.label,
    };

    for (var key in newPayload) {
      if (newPayload[key] === "" || newPayload[key] === null) {
        delete newPayload[key];
      }
    }

    submitRegionalInnovationMutation.mutate(
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
                navigate("/inovasi-daerah");
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
      <div className="text-[#333333] text-2xl font-bold">Inovasi Daerah</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/inovasi-daerah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Inovasi Daerah
          </span>
        </div>
        <SelectOption
          label="Nama Pemda"
          placeholder="Pilih Nama Pemda"
          options={loadOptionsPemdaName}
          paginate={true}
          onChange={(e) => onHandleChange("nama_pemda", e)}
          value={payload?.nama_pemda}
          getOptionLabel={getOptionLabelPemdaName}
        />
        <TextInput
          label={"Nama Inovasi"}
          placeholder="Tulis disini"
          onChange={(e) => onHandleChange("nama_inovasi", e.target.value)}
          value={payload.nama_inovasi}
        />
        <ChecboxContainer
          label={"Tahapan Inovasi"}
          options={["inisiatif", "uji coba", "penerapan"]}
          onChange={(key, value) => onHandleChange(key, value)}
          value={payload.tahapan_inovasi}
          type="tahapan_inovasi"
        />

        <ChecboxContainer
          label={"Inisiator Inovasi Daerah"}
          options={[
            "Kepala Daerah",
            "Anggota DPRD",
            "OPD",
            "ASN",
            "Masyarakat",
          ]}
          onChange={(key, value) => onHandleChange(key, value)}
          value={payload.inisiator_inovasi}
          type="inisiator_inovasi"
        />

        <ChecboxContainer
          label={"Jenis Inovasi"}
          options={["Digital", "Non Digital"]}
          onChange={(key, value) => onHandleChange(key, value)}
          value={payload.jenis_inovasi}
          type="jenis_inovasi"
        />

        <div className="flex gap-6">
          <SelectOption
            label={"Bentuk Inovasi Daerah"}
            options={regionalInnovationForm.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder={"Pilih"}
            onChange={(value) => {
              onHandleChange("bentuk_inovasi", value);
            }}
            value={payload?.bentuk_inovasi}
          />

          <SelectOption
            label={"Tematik"}
            options={tematik.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder={"Pilih"}
            onChange={(value) => {
              onHandleChange("tematik", value);
            }}
            value={payload?.tematik}
          />
        </div>

        <SelectOption
          label="Urusan Pemerintahan"
          placeholder="Pilih"
          options={loadedOptionsBusinessGovernment}
          paginate={true}
          onChange={(e) => onHandleChange("urusan_pemerintah", e)}
          value={payload?.urusan_pemerintah}
        />

        <div className="flex gap-6">
          <div className="flex-1">
            <TextInput
              label={"Waktu Uji Coba Inovasi Daerah"}
              value={payload.waktu_uji_coba}
              onChange={(e) => onHandleChange("waktu_uji_coba", e.target.value)}
              placeholder={"Pilih tanggal uji coba"}
              type={"date"}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label={"Waktu Penerapan Inovasi Daerah"}
              value={payload.waktu_penerapan}
              onChange={(e) =>
                onHandleChange("waktu_penerapan", e.target.value)
              }
              placeholder={"Pilih tanggal penerapan"}
              type={"date"}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Rancang Bangun {"(Minimal 300 kata)"}
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.rancang_bangun}
            onChange={(value) => onHandleChange("rancang_bangun", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Tujuan Inovasi Daerah
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.tujuan}
            onChange={(value) => onHandleChange("tujuan", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Manfaat yang diperoleh
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.manfaat}
            onChange={(value) => onHandleChange("manfaat", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Hasil Inovasi
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.hasil_inovasi}
            onChange={(value) => onHandleChange("hasil_inovasi", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
          />
        </div>

        <Upload
          label="Anggaran (Jika Diperlukan)"
          description={"Dokumen PDF, Maksimal 2MB"}
          onChange={(e) => onHandleChangeImage("anggaran_file", e)}
          value={payload.anggaran_file}
        />

        <Upload
          label="Profil Bisnis (Jika Ada)"
          description={"Dokumen PDF, Maksimal 2MB"}
          onChange={(e) => onHandleChangeImage("profile_file", e)}
          value={payload.profile_file}
        />

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
              onClick={() => {
                navigate("/inovasi-daerah");
              }}
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

export default RegionalInnovationForm;
