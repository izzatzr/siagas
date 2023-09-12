import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUtilContexts } from "../../../../context/Utils";
import { useMutation, useQuery } from "react-query";
import {
  BASE_API_URL,
  GET_ALL_DOCUEMNT_CATEGORY,
  GET_DOCUEMNT,
} from "../../../../constans/constans";
import {
  findDocument,
  submitDocument,
} from "../../../../services/MasterData/document";
import { BiArrowBack } from "react-icons/bi";
import TextInput from "../../../../components/TextInput";
import { getAllDocumentCategory } from "../../../../services/MasterData/documentCategory";
import SelectOption from "../../../../components/SelectOption";
import { convertQueryString, getToken } from "../../../../utils";
import Upload from "../../../../components/Upload";
import ReactQuill from "react-quill";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { isHTML } from "../../../../helpers/isHtml";

const initialPayload = {
  title: "",
  category: null,
  content: "",
  document: null,
};

const initialParams = {
  page: 1,
  limit: 20,
  q: "",
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const FormDocumentDashboard = () => {
  const [payload, setPayload] = React.useState(initialPayload);
  const params = useParams();
  const currentId = params.id;
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const loadOptionCategories = async (search, loadedOptions, { page }) => {
    const paramsQueryString = convertQueryString(initialParams);
    const response = await fetch(
      `${BASE_API_URL}/kategori_dokumen?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const responseJSON = await response.json();

    return {
      options: responseJSON?.data,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

  const submitDocumentMutation = useMutation(submitDocument);

  const { refetch: refetchAnnouncement } = useQuery(
    [GET_DOCUEMNT],
    findDocument(currentId),
    {
      enabled: false,
      onSuccess: (res) => {
        const { data } = res;
        setPayload({
          title: data?.title.toString(),
          category: data?.category,
          document: data?.document,
          content: isHTML(data?.content)
            ? data?.content
            : `<p>${data?.content}</p>`,
        });
        setLoadingUtil(false);
      },
    }
  );

  const onHandleChange = (name, value) => {
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
  };

  React.useEffect(() => {
    if (currentId) {
      setLoadingUtil(true);
      refetchAnnouncement();
    }
  }, [currentId]);

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
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
          />
        </div>
        <Upload
          label="File Dokumen"
          description={"Dokumen PDF, Maksimal 2MB"}
          onChange={onHandleChangeImage}
          value={payload.document}
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
