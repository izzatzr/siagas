import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { useUtilContexts } from "../../../../context/Utils";
import {
  BASE_API_URL,
  GET_OPD,
  GET_USER_ACCOUNT,
} from "../../../../constans/constans";
import {
  getUserAccount,
  updateUserAccount,
} from "../../../../services/Configuration/userAccount";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken } from "../../../../utils";
import { getOPD, updateOPD } from "../../../../services/Configuration/opd";

const initialPayload = {
  name: "",
};

const initialParamsRole = {
  page: 1,
  limit: 20,
  name: "",
};

const OPDEdit = () => {
  const [payload, setPayload] = React.useState(initialPayload);
  const params = useParams();
  const currentId = params.id;
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();
  const [isPayloadEmpty, setIsPayloadEmpty] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState({
    name: "",
  });

  const { refetch: refetchOPD } = useQuery([GET_OPD], getOPD(currentId), {
    enabled: false,
    onSuccess: (res) => {
      const { data } = res;
      setPayload({
        name: data.name,
      });
      setLoadingUtil(false);
    },
  });

  const updateOPDMutation = useMutation(updateOPD);

  React.useEffect(() => {
    const isEmpty = Object.values(payload).some(
      (value) => value === null || value === ""
    );

    setIsPayloadEmpty(isEmpty);
  }, [payload]);

  const onHandleChange = (name, value) => {
    setErrorMessage({
      ...errorMessage,
      [name]: "",
    });
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const onHandleSubmit = () => {
    setLoadingUtil(true);

    let newPayload = payload;

    for (var key in newPayload) {
      if (newPayload[key] === "") {
        delete newPayload[key];
      }
    }

    updateOPDMutation.mutate(
      {
        id: currentId,
        name: payload.name,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/konfigurasi/daftar-opd");
            });
          }

          if (res.status === "validation") {
            const errorTemp = errorMessage;
            res.error.map((error) => {
              errorTemp[error.object] = error.message;
            });

            setErrorMessage(errorTemp);
          }

          setLoadingUtil(false);
        },
        onError: () => {
          setLoadingUtil(false);
          snackbar("Terjadi kesalahan", () => {
            window.location.reload();
          });
        },
      }
    );
  };

  React.useEffect(() => {
    if (currentId) {
      setLoadingUtil(true);
      refetchOPD();
    }
  }, [currentId]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">OPD</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/daftar-opd">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            OPD
          </span>
        </div>
        <div>
          <TextInput
            label="Nama OPD"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("name", e.target.value);
            }}
            value={payload.name}
            errorMessage={errorMessage?.name}
            required
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

export default OPDEdit;
