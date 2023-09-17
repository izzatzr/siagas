import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUtilContexts } from "../../../../context/Utils";
import {
  findDocumentCategory,
  submitDocumentCategory,
} from "../../../../services/MasterData/documentCategory";
import TextInput from "../../../../components/TextInput";
import { useMutation, useQuery } from "react-query";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { GET_DOCUEMNT_CATEGORY } from "../../../../constans/constans";

const initialPayload = {
  slug: "",
  name: "",
};

const DocumentCategoryForm = () => {
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

  const { isFetching } = useQuery(
    [GET_DOCUEMNT_CATEGORY],
    findDocumentCategory(currentId),
    {
      enabled: !!currentId,
      onSuccess: (res) => {
        const { data } = res;
        setPayload({
          name: data?.name,
          slug: data?.slug,
        });
      },
      onError: () => {
        snackbar(
          "Terjadi Kesalahan",
          () => {
            navigate("/master/kategori-dokumen");
          },
          { type: "error" }
        );
      },
    }
  );

  const submitDocumentCategoryMutation = useMutation(submitDocumentCategory);

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
      submitDocumentCategoryMutation.mutate(
        {
          ...payload,
          id: currentId,
        },
        {
          onSuccess: (res) => {
            if (res.code === 200) {
              setLoadingUtil(false);
              snackbar(
                currentId ? "Berhasil diubah" : "Berhasil disimpan",
                () => {
                  navigate("/master/kategori-dokumen");
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

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">
        Kategori Dokumen
      </div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/kategori-dokumen">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Kategori Dokumen
          </span>
        </div>

        <TextInput
          label="Nama Kategori"
          placeholder="Masukkan Nama Kategori"
          onChange={(e) => {
            onHandleChange("name", e.target.value);
          }}
          value={payload?.name}
          errorMessage={error?.name}
        />

        <TextInput
          label="Slug"
          placeholder="Masukkan Slug"
          onChange={(e) => {
            onHandleChange("slug", e.target.value);
          }}
          value={payload?.slug}
          errorMessage={error?.slug}
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

export default DocumentCategoryForm;
