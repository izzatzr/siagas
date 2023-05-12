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
import { GET_ANNOUNCEMENT } from "../../../../constans/constans";
import { isHTML } from "../../../../helpers/isHtml";

const initialPayload = {
  title: "",
  slug: "",
  content: "",
  document: null,
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


const FormAnnouncementDashboard = () => {
  const [payload, setPayload] = React.useState(initialPayload);
  const params = useParams();
  const currentId = params.id;
  const { snackbar, setLoadingUtil } = useUtilContexts();
  const navigate = useNavigate();

  const { refetch: refetchAnnouncement } = useQuery(
    [GET_ANNOUNCEMENT],
    findAnnouncement(currentId),
    {
      enabled: false,
      onSuccess: (res) => {
        const { data } = res;
        console.log(
          isHTML(data?.content) ? data?.content : `<div>${data?.content}</div>`
        );
        setPayload({
          title: data?.title.toString(),
          slug: data?.slug.toString(),
          document: data?.document,
          content: isHTML(data?.content)
            ? data?.content
            : `<p>${data?.content}</p>`,
        });
        setLoadingUtil(false);
      },
    }
  );

  const submitAnnouncementMutation = useMutation(submitAnnouncement);

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
    submitAnnouncementMutation.mutate(
      {
        title: payload?.title,
        slug: payload?.slug,
        content: payload?.content,
        document: payload?.document,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar("Berhasil disimpan", () => {
              navigate("/master/pengumuman");
            });
          }
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

export default FormAnnouncementDashboard;
