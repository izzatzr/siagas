import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation } from "react-query";
import { submitAssessmentTeam } from "../../../../services/MasterData/assessmentTeam";
import { useUtilContexts } from "../../../../context/Utils";

const initialPayload = {
  instansi: "",
  nama: "",
  asn_username: "",
};

const AssessmentTeamForm = () => {
  const params = useParams();
  const currentId = params.id;

  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  const onHandleChange = (key, value) => {
    if (value.length > 0) {
      setError({
        ...error,
        [key]: "",
      });
    }
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const submitAssessmentTeamMutation = useMutation(submitAssessmentTeam);

  const onHandleSubmit = () => {
    let errorMessage = {};

    Object.keys(payload)?.forEach((key, index) => {
      switch (true) {
        case !payload?.[key]:
          errorMessage[key] = "Harus diisi";
      }
    });

    if (Object.keys(errorMessage).length === 0) {
      setLoadingUtil(true);
      submitAssessmentTeamMutation.mutate(payload, {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar(
              currentId ? "Berhasil diubah" : "Berhasil disimpan",
              () => {
                navigate("/master/tim-penilaian");
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
      <div className="text-[#333333] font-medium text-2xl">Tim Penilaian</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/tim-penilaian">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Tim Penilaian
          </span>
        </div>

        <TextInput
          label="User ASN"
          placeholder="Tulis User ASN"
          onChange={(e) => {
            onHandleChange("asn_username", e.target.value);
          }}
          value={payload?.asn_username}
          errorMessage={error?.asn_username}
        />

        <TextInput
          label="Nama"
          placeholder="Tulis Nama"
          onChange={(e) => {
            onHandleChange("nama", e.target.value);
          }}
          value={payload?.nama}
          errorMessage={error?.nama}
        />

        <TextInput
          label="Instansi"
          placeholder="Tulis Instansi"
          onChange={(e) => {
            onHandleChange("instansi", e.target.value);
          }}
          value={payload?.instansi}
          errorMessage={error?.instansi}
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

export default AssessmentTeamForm;
