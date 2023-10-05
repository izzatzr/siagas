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
  GET_ALL_TUXEDO,
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

const initialPayload = {
  title: "",
  slug: "",
  section: null,
  content: "",
};

const loadOptionSection = [
  {
    name: "About Us",
    value: "About us",
  },
  {
    name: "Faq",
    value: "faq",
  },
  {
    name: "Profile",
    value: "profile",
  },
];

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

const TuxedoEdit = () => {
  const [payload, setPayload] = React.useState(initialPayload);
  const params = useParams();
  const currentId = params.id;
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState({
    title: "",
    slug: "",
    content: "",
  });

  const { refetch: refetchTuxedo } = useQuery(
    [GET_TUXEDO],
    getTuxedo(currentId),
    {
      enabled: false,
      onSuccess: (res) => {
        const { data } = res;
        setPayload({
          title: data.title,
          slug: data.slug,
          content: data.content,
          section: loadOptionSection.filter(
            (sec) => sec.value === data.section
          )[0],
        });
        setLoadingUtil(false);
      },
    }
  );

  const updateTuxedoMutation = useMutation(updateTuxedo);

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
      section: payload?.section?.value,
    };

    console.log(newPayload);

    for (var key in newPayload) {
      if (newPayload[key] === "") {
        delete newPayload[key];
      }
    }

    updateTuxedoMutation.mutate(
      {
        id: currentId,
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/konfigurasi/tuxedo");
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
      refetchTuxedo();
    }
  }, [currentId]);

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Tuxedo</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/konfigurasi/tuxedo">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Tuxedo
          </span>
        </div>
        <div>
          <TextInput
            label="Judul"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("title", e.target.value);
            }}
            value={payload.title}
            errorMessage={errorMessage?.title}
            required
          />
        </div>
        <div>
          <TextInput
            label="Slug"
            placeholder="Tulis Disini..."
            onChange={(e) => {
              onHandleChange("slug", e.target.value);
            }}
            value={payload.slug}
            errorMessage={errorMessage?.slug}
            required
          />
        </div>
        <div className="flex-1">
          <SelectOption
            label="Section"
            placeholder="Pilih Section"
            options={loadOptionSection}
            onChange={(e) => onHandleChange("section", e)}
            value={payload?.section}
            required
          />
        </div>
        <div className="space-y-3">
          <label
            htmlFor="content"
            className="text-[#333333] text-sm font-normal"
          >
            <span className="mr-1 text-red-600">*</span>
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.content}
            onChange={(value) => onHandleChange("content", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis Disini..."
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

export default TuxedoEdit;
