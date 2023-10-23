import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_DISTRICT_QUERY_KEY } from "../../../../constans/constans";
import {
  findDistrict,
  submitDistrict,
} from "../../../../services/Configuration/district";
import { useMutation, useQuery } from "react-query";
import { BiArrowBack } from "react-icons/bi";
import { useUtilContexts } from "../../../../context/Utils";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";

const initialPayload = {
  name: "",
};

const FormDistrict = () => {
  const params = useParams();
  const currentId = params.id;

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  useQuery([GET_DISTRICT_QUERY_KEY], findDistrict(currentId), {
    enabled: !!currentId,
    onSuccess: async (res) => {
      const { data } = res;
      setPayload({
        name: data?.nama_distrik,
      });
    },
    onError: () => {
      snackbar("Terjadi Kesalahan", () => {}, { type: "error" });
    },
  });

  const submitDistrictMutation = useMutation(submitDistrict);

  const onHandleChange = (name, value) => {
    if (value.length > 0) {
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

  const onHandleSubmit = () => {
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

      submitDistrictMutation.mutate(
        {
          id: currentId,
          ...payload,
        },
        {
          onSuccess: (res) => {
            if (res.code === 200) {
              setLoadingUtil(false);
              snackbar(
                currentId ? "Berhasil diubah" : "Berhasil disimpan",
                () => {
                  navigate("/konfigurasi/distrik");
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
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Distrik</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/distrik">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Distrik
          </span>
        </div>
        <div className="flex-1">
          <TextInput
            label="Nama Distrik"
            placeholder="Tulis nama distrik disini"
            onChange={(e) => {
              onHandleChange("name", e.target.value);
            }}
            value={payload?.name}
            errorMessage={error?.name}
          />
        </div>
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
              onClick={() => navigate(-1)}
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

export default FormDistrict;
