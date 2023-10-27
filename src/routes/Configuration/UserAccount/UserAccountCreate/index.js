import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation } from "react-query";
import { useUtilContexts } from "../../../../context/Utils";
import { BASE_API_URL } from "../../../../constans/constans";
import { createUserAccount } from "../../../../services/Configuration/userAccount";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken, getUser } from "../../../../utils";

const initialPayload = {
  password: "",
  username: "",
  email: "",
  namaPanggilan: "",
  namaPemda: "",
  namaLengkap: "",
  roleId: null,
};

const initialParamsRole = {
  page: 1,
  limit: 20,
  name: "",
};

const UserAccountCreate = () => {
  const params = useParams();
  const user = getUser();

  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [isPayloadEmpty, setIsPayloadEmpty] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState({
    password: "",
    username: "",
    email: "",
    namaPanggilan: "",
    namaPemda: "",
    namaLengkap: "",
  });

  const loadOptionRole = async (search, loadedOptions, { page }) => {
    const paramsQueryString = convertQueryString({
      ...initialParamsRole,
      name: search,
    });
    const response = await fetch(`${BASE_API_URL}/role?${paramsQueryString}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const responseJSON = await response.json();
    const results = [];

    responseJSON?.data?.forEach((item) => {
      results.push({
        ...item,
        isDisabled: user?.is_super_admin === "t" && item?.name !== "User",
      });
    });

    return {
      options: results,
      hasMore: results.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

  const createUserAccountMutation = useMutation(createUserAccount);

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

    let newPayload = {
      ...payload,
      roleId: payload?.roleId.id,
    };

    console.log(newPayload);

    for (var key in newPayload) {
      if (newPayload[key] === "") {
        delete newPayload[key];
      }
    }

    createUserAccountMutation.mutate(
      {
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/konfigurasi/user-account");
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
      <div className="text-[#333333] font-medium text-2xl">User Account</div>
      {createUserAccountMutation.isError ? (
        <div>An error occurred: {createUserAccountMutation.error.message}</div>
      ) : null}
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/user-account">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            User Account
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SelectOption
              label="Role"
              placeholder="Pilih Role"
              options={loadOptionRole}
              onChange={(e) => onHandleChange("roleId", e)}
              value={payload?.roleId}
              paginate
              required
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Nama Lengkap"
              placeholder="Tulis Disini..."
              onChange={(e) => {
                onHandleChange("namaLengkap", e.target.value);
              }}
              value={payload.namaLengkap}
              errorMessage={errorMessage?.namaLengkap}
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <TextInput
              label="Nama Panggilan"
              placeholder="Tulis Disini..."
              onChange={(e) => {
                onHandleChange("namaPanggilan", e.target.value);
              }}
              value={payload.namaPanggilan}
              errorMessage={errorMessage?.namaPanggilan}
              required
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Email"
              placeholder="Tulis Disini..."
              onChange={(e) => {
                onHandleChange("email", e.target.value);
              }}
              value={payload.email}
              errorMessage={errorMessage?.email}
              required
            />
          </div>
        </div>
        <div>
          <TextInput
            label="Nama OPD / Unit (Sekolah/Puskesmas)"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("namaPemda", e.target.value);
            }}
            value={payload.namaPemda}
            errorMessage={errorMessage?.namaPemda}
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <TextInput
              label="Username"
              placeholder="Tulis Disini..."
              onChange={(e) => {
                onHandleChange("username", e.target.value);
              }}
              value={payload?.username}
              errorMessage={errorMessage?.username}
              required
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Password"
              placeholder="Tulis Disini..."
              onChange={(e) => {
                onHandleChange("password", e.target.value);
              }}
              value={payload.password}
              errorMessage={errorMessage?.password}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 w-60">
          <div className="flex-1">
            <Button
              onClick={onHandleSubmit}
              padding="px-3 py-2"
              text="Simpan"
              icon={<MdCheckCircle />}
              // disabled={isPayloadEmpty}
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

export default UserAccountCreate;
