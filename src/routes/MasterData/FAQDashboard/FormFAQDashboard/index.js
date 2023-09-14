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
import { GET_FAQ, formats, modules } from "../../../../constans/constans";

const initialPayload = {
  question: "",
  answer: "",
};

const FormFAQDashboard = () => {
  const params = useParams();
  const currentId = params.id;

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();

  const [payload, setPayload] = React.useState(initialPayload);
  const [error, setError] = React.useState({});

  useQuery([GET_FAQ], findFAQ(currentId), {
    enabled: !!currentId,
    onSuccess: async (res) => {
      const { data } = res;
      setPayload({
        question: data?.question,
        answer: data?.answer,
      });
    },
    onError: () => {
      snackbar("Terjadi Kesalahan", () => {}, { type: "error" });
    },
  });

  const submitFAQMutation = useMutation(submitFAQ);

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
              setLoadingUtil(false);
              snackbar(
                currentId ? "Berhasil diubah" : "Berhasil disimpan",
                () => {
                  navigate("/master/faq");
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
            errorMessage={error?.question}
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
            className={error?.answer ? "border border-red-500" : ""}
          />
          <span className="text-xs text-red-600">{error?.answer}</span>
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
