import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../../components/TextInput";
import ReactQuill from "react-quill";
import Button from "../../../../components/Button";
import { MdCheckCircle } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { findFAQ, submitFAQ } from "../../../../services/MasterData/faq";
import { useUtilContexts } from "../../../../context/Utils";
import { GET_FAQ } from "../../../../constans/constans";

const initialPayload = {
  question: "",
  answer: "",
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

const FormFAQDashboard = () => {
  const params = useParams();
  const currentId = params.id;
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [errorMessage, setErrorMessage] = React.useState({
    question: "",
    answer: "",
  });

  const { refetch: refetchFAQ } = useQuery([GET_FAQ], findFAQ(currentId), {
    onSuccess: (res) => {
      const { data } = res;
      setPayload({ question: data.question, answer: data.answer });
    },
  });

  const submitFAQMutation = useMutation(submitFAQ);

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

    submitFAQMutation.mutate(
      {
        id: currentId,
        ...newPayload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            snackbar("Berhasil disimpan", () => {
              navigate("/master/faq");
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
          snackbar("Terjadi kesalahan", () => {
            window.location.reload();
          });
        },
      }
    );
  };

  React.useEffect(() => {
    if (currentId) {
      refetchFAQ();
    }
  }, [currentId]);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">FAQ</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/master/faq">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">
            {params?.action === "tambah" ? "Tambah " : "Edit "}
            FAQ
          </span>
        </div>
        <div className="flex-1">
          <TextInput
            label="Question"
            placeholder="Tulis disini"
            onChange={(e) => {
              onHandleChange("question", e.target.value);
            }}
            value={payload?.question}
            errorMessage={errorMessage?.question}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={"content"}
            className="text-[#333333] text-sm font-normal"
          >
            Answer
          </label>
          <ReactQuill
            theme="snow"
            value={payload?.answer}
            onChange={(value) => onHandleChange("answer", value)}
            modules={modules}
            formats={formats}
            placeholder="Tulis disini"
            className={`border ${
              errorMessage?.answer !== "" && "border-[red]"
            }`}
          />
          <span className="text-xs text-red-600">{errorMessage?.answer}</span>
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

export default FormFAQDashboard;
