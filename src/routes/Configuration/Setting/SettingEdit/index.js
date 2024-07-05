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
  GET_ALL_SETTING,
  GET_ALL_TUXEDO,
  GET_SETTING,
  GET_TUXEDO,
  GET_UPDT,
  GET_USER_ACCOUNT,
} from "../../../../constans/constans";
import {
  getUserAccount,
  updateUserAccount,
} from "../../../../services/Configuration/userAccount";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken } from "../../../../utils";
import { getUPTD, updateUPTD } from "../../../../services/Configuration/updt";
import {
  getTuxedo,
  updateTuxedo,
} from "../../../../services/Configuration/tuxedo";
import ReactQuill from "react-quill";
import {
  getSetting,
  updateSetting,
} from "../../../../services/Configuration/setting";

const initialPayload = {
  helper: "",
  value: "",
  key: "",
};

const SettingEdit = () => {
  const [payload, setPayload] = React.useState(initialPayload);
  const params = useParams();
  const currentId = params.id;
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState({
    helper: "",
    value: "",
    key: "",
  });

  const { refetch: refetchSetting } = useQuery(
    [GET_SETTING],
    getSetting(currentId),
    {
      enabled: false,
      onSuccess: (res) => {
        const { data } = res;
        setPayload({
          helper: data.helper,
          key: data.key,
          value: data.value,
        });
        setLoadingUtil(false);
      },
    }
  );

  const updateSettingMutation = useMutation(updateSetting);

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

    updateSettingMutation.mutate(
      {
        id: currentId,
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/konfigurasi/setting");
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
      refetchSetting();
    }
  }, [currentId]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Setting</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/setting">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Setting
          </span>
        </div>
        <div>
          <TextInput
            label="Konfigurasi"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("key", e.target.value);
            }}
            value={payload.key}
            errorMessage={errorMessage?.key}
            required
          />
        </div>
        <div>
          <TextInput
            label="Nilai"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("value", e.target.value);
            }}
            value={payload.value}
            errorMessage={errorMessage?.value}
            required
          />
        </div>
        <div>
          <TextInput
            label="Helper"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("helper", e.target.value);
            }}
            value={payload.helper}
            errorMessage={errorMessage?.helper}
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

export default SettingEdit;
