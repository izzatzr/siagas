import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../components/TextInput";
import ReactQuill from "react-quill";
import Upload from "../../../../components/Upload";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import {
  findAnnouncement,
  submitAnnouncement,
} from "../../../../services/MasterData/announcement";
import { useUtilContexts } from "../../../../context/Utils";
import {
  GET_ANNOUNCEMENT,
  formats,
  modules,
} from "../../../../constans/constans";

const initialPayload = {
  title: "",
  slug: "",
  content: "",
  document: null,
};

const FormAnnouncementDashboard = () => {
  const params = useParams();
  const currentId = params.id;

  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  useQuery([GET_ANNOUNCEMENT], findAnnouncement(currentId), {
    enabled: !!currentId,
    onSuccess: async (res) => {
      const { data } = res;
      setPayload({
        title: data?.title,
        slug: data?.slug,
        content: data?.content,
      });
    },
    onError: () => {
      snackbar("Terjadi Kesalahan", () => {}, { type: "error" });
    },
  });

  const submitAnnouncementMutation = useMutation(submitAnnouncement);

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
        case !payload?.document && !currentId && key === "document":
          errorMessage[key] = "Harus diisi";
        case !payload?.[key] && key !== "document":
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
        slug: payload?.slug,
        content: payload?.content,
        document: payload?.document,
      };

      for (var key in newPayload) {
        if (newPayload[key] === "" || newPayload[key] === null) {
          delete newPayload[key];
        }
      }

      submitAnnouncementMutation.mutate(
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
                  navigate("/master/pengumuman");
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
      <div className="text-[#333333] font-medium text-2xl">Pengumuman</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/pengumuman">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            Pengumuman
          </span>
        </div>
        <div className="flex items-center gap-3">
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
          <div className="flex-1">
            <TextInput
              label="Slug"
              placeholder="Tulis Slug"
              onChange={(e) => {
                onHandleChange("slug", e.target.value);
              }}
              value={payload.slug}
              errorMessage={error?.slug}
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
          value={payload.document}
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

export default FormAnnouncementDashboard;
