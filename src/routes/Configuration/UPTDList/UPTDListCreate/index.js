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
  GET_UPDT,
  GET_USER_ACCOUNT,
} from "../../../../constans/constans";
import {
  getUserAccount,
  updateUserAccount,
} from "../../../../services/Configuration/userAccount";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken } from "../../../../utils";
import {
  createUPTD,
  getUPTD,
  updateUPTD,
} from "../../../../services/Configuration/updt";

const initialPayload = {
  name: "",
  regionalApparatur: null,
};

const initialParamsOPD = {
  page: 1,
  limit: 20,
  name: "",
};

const UPTDListCreate = () => {
  const params = useParams();
  const [payload, setPayload] = React.useState(initialPayload);
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();
  const createUPTDMutation = useMutation(createUPTD);
  const [errorMessage, setErrorMessage] = React.useState({
    name: "",
  });

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialParamsOPD,
      name: search,
    });
    const response = await fetch(`${BASE_API_URL}/opd?${paramsQueryString}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const responseJSON = await response.json();

    return {
      options: responseJSON?.data,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

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

    let newPayload = {
      ...payload,
      regionalApparatur: payload?.regionalApparatur?.id,
    };

    console.log(newPayload);

    for (var key in newPayload) {
      if (newPayload[key] === "") {
        delete newPayload[key];
      }
    }

    createUPTDMutation.mutate(
      {
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/konfigurasi/daftar-uptd");
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

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">UPTD</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/daftar-uptd">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            UPTD
          </span>
        </div>
        <div className="flex-1">
          <SelectOption
            label="Nama OPD"
            placeholder="Pilih OPD"
            options={loadOptionOPD}
            onChange={(e) => onHandleChange("regionalApparatur", e)}
            value={payload?.regionalApparatur}
            paginate
            required
          />
        </div>
        <div>
          <TextInput
            label="Nama UPTD"
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

export default UPTDListCreate;
