import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUtilContexts } from "../../../../context/Utils";
import { useMutation, useQuery } from "react-query";
import {
  BASE_API_URL,
  GET_DOCUEMNT,
  formats,
  modules,
} from "../../../../constans/constans";
import {
  findDocument,
  submitDocument,
} from "../../../../services/MasterData/document";
import { BiArrowBack } from "react-icons/bi";
import TextInput from "../../../../components/TextInput";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken } from "../../../../utils";
import Upload from "../../../../components/Upload";
import ReactQuill from "react-quill";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";

const initialPayload = {
  title: "",
  category: null,
  content: "",
  document: null,
};

const initialDocumentCategoryParams = {
  page: 1,
  limit: 20,
  q: "",
};

const FormDocumentDashboard = () => {
  const params = useParams();
  const currentId = params.id;

  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  const loadDocumentCategory = async (id) => {
    const paramsQueryString = convertQueryString(initialDocumentCategoryParams);

    const response = await fetch(
      `${BASE_API_URL}/kategori_dokumen${id ? `/${id}` : `?${paramsQueryString}`}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    return await response.json();
  };

  const loadOptionCategories = async (search, loadedOptions, { page }) => {
    const responseJSON = await loadDocumentCategory();
    const results = [];
    responseJSON.data.map((item) => {
      results.push({
        id: item.id,
        label: item.name,
        value: item?.name,
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

  useQuery([GET_DOCUEMNT], findDocument(currentId), {
    enabled: !!currentId,
    onSuccess: async (res) => {
      const { data } = res;
      const category = await loadDocumentCategory(data?.category_id)
      setPayload({
        title: data?.title,
        category : {
          id : category?.data?.id,
          label : category?.data?.name,
          value : category?.data?.name,
        },
        content: data?.content,
      })
    },
    onError : () => {
      snackbar("Terjadi Kesalahan", () => {}, {type : "error"})
    }
  });

  const submitDocumentMutation = useMutation(submitDocument);

  const onHandleChange = (name, value) => {
    if (value.length > 0 || value?.value?.length > 0) {
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

  const onHandleChangeImage = (e) => {
    const { files } = e.target;

    setPayload({
      ...payload,
      document: files[0],
    });
  };

  const onHandleSubmit = () => {
    let isValidPayload = true,
      errorMessage = {};

    Object.keys(payload)?.forEach((key, index) => {
      switch (true) {
        case !payload?.document && !currentId && key === 'document':
          errorMessage[key] = "Harus diisi";
        case !payload?.[key] && key !== 'document':
          errorMessage[key] = "Harus diisi";

          if (index === Object.keys(payload).length - 1) {
            return (isValidPayload = false);
          }
      }
    });

    if (Object.keys(errorMessage).length === 0) {
      setLoadingUtil(true);

      let newPayload = {
        title: payload?.title,
        category_id: payload?.category?.id,
        content: payload?.content,
        document: payload?.document,
      };

      for (var key in newPayload) {
        if (newPayload[key] === "" || newPayload[key] === null) {
          delete newPayload[key];
        }
      }

      submitDocumentMutation.mutate(
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
                  navigate("/master/dokumen");
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
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Dokumen</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/dokumen">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Dokumen
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SelectOption
              label="Kategori"
              placeholder="Pilih Kategori"
              options={loadOptionCategories}
              paginate={true}
              onChange={(e) => onHandleChange("category", e)}
              value={payload?.category}
              errorMessage={error?.category}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Judul"
              placeholder="Tulis judul"
              onChange={(e) => {
                onHandleChange("title", e.target.value);
              }}
              value={payload?.title}
              errorMessage={error?.title}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.content}
            onChange={(value) => onHandleChange("content", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
            className={error?.content ? "border border-red-500" : ""}
          />

          <span className="text-xs text-red-600 absolute -bottom-4">
            {error?.content}
          </span>
        </div>
        <Upload
          label="File Dokumen"
          description={"Dokumen PDF, Maksimal 2MB"}
          onChange={onHandleChangeImage}
          value={payload?.document}
          errorMessage={error?.document}
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

export default FormDocumentDashboard;
