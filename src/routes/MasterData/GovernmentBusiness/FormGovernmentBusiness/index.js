import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { GET_GOVERNMENT_BUSINESS } from "../../../../constans/constans";
import {
  findGovernmentBusiness,
  submitGovernmentBusiness,
} from "../../../../services/MasterData/GovernmentBusiness";
import { useUtilContexts } from "../../../../context/Utils";

const initialPayload = {
  deadline: "",
  name: "",
};

const FormGovernmentBusiness = () => {
  const params = useParams();
  const currentId = params.id;

  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  const { isFetching } = useQuery(
    [GET_GOVERNMENT_BUSINESS],
    findGovernmentBusiness(currentId),
    {
      enabled: !!currentId,
      onSuccess: (res) => {
        const { data } = res;
        setPayload({
          name: data?.name,
          deadline: data?.deadline,
        });
      },
      onError: () => {
        snackbar(
          "Terjadi Kesalahan",
          () => {
            navigate("/master/urusan-pemerintah");
          },
          { type: "error" }
        );
      },
    }
  );

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

  const submitGovernmentBusinessMutation = useMutation(
    submitGovernmentBusiness
  );

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
      submitGovernmentBusinessMutation.mutate({
        ...payload,
        id : currentId
      }, {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar(
              currentId ? "Berhasil diubah" : "Berhasil disimpan",
              () => {
                navigate("/master/urusan-pemerintah");
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

  React.useEffect(() => {
    setLoadingUtil(isFetching)
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">
        Urusan Pemerintah
      </div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/urusan-pemerintah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Urusan Pemerintah
          </span>
        </div>
        <TextInput
          label="Masukkan Tanggal Deadline"
          placeholder="Masukkan Tanggal. (Format: MM-dd-YYYY)"
          onChange={(e) => {
            onHandleChange("deadline", e.target.value);
          }}
          value={payload?.deadline}
          type={"date"}
          errorMessage={error?.deadline}
        />
        <TextInput
          label="Nama Urusan"
          placeholder="Masukkan Nama Urusan"
          onChange={(e) => {
            onHandleChange("name", e.target.value);
          }}
          value={payload?.name}
          errorMessage={error?.name}
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

export default FormGovernmentBusiness;
