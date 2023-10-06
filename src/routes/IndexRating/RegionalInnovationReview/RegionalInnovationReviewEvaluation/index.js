import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRegionalInnovationReviewEvaluation } from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import { useUtilContexts } from "../../../../context/Utils";
import { GET_REGIONAL_INNOVATION_REVIEW_EVALUATION } from "../../../../constans/constans";
import Table from "../../../../components/Table";
import { DOWNLOAD_TABLE } from "../../../../constants";
import TableAction from "../../../../components/TableAction";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import SelectOption from "../../../../components/SelectOption";
import ReactQuill from "react-quill";
import Button from "../../../../components/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";

const initialForm = {
  currentData: null,
  category: null,
  description: null,
};

const currentData = [
  "Tidak dapat diukur",
  "SK Kepala Perangkat Daerah",
  "SK Kepala Daerah",
  "Peraturan Kepala Daerah / Peraturan Daerah",
];

const categories = [
  {
    name: "Tidak Sesuai",
    value: "Tidak Sesuai",
  },
  {
    name: "Sesuai",
    value: "Sesuai",
  },
];

const RegioanlInnovationReviewInnovationEvaluation = () => {
  const params = useParams();
  const currentId = params.id;
  const currentEvaluationId = params.evaluationId;

  const [value, setValue] = React.useState("");
  const [formData, setFormData] = React.useState(initialForm);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const navigate = useNavigate();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, data } = useQuery(
    [GET_REGIONAL_INNOVATION_REVIEW_EVALUATION],
    getRegionalInnovationReviewEvaluation(currentId, currentEvaluationId)
  );

  console.log("DATA", data);

  const actionTableData = [
    {
      code: DOWNLOAD_TABLE,
      onClick: (item) => {},
    },
  ];

  const tableHeader = [
    {
      key: "nomor_surat",
      title: "Nomor Surat/Dokumen",
    },
    {
      key: "tanggal_surat",
      title: "Tanggal Surat/Dokumen",
    },
    {
      key: "tentang_surat",
      title: "Tentang",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const onHandleCurrentDataChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      currentData: value,
    }));
  };

  const onHandleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const onHandleSubmit = () => {
    const payload = {
      evaluasi_id: data?.data?.evaluasi_id,
      document_id: data?.data?.document
        ? data?.data?.document?.id || data?.data?.document?.document_id
        : null,
      nomor_surat: data?.data?.nomor_surat,
      nomor: "string",
      tanggal_surat: "string",
      tentang_surat: "string",
      data_saat_ini: "string",
      document_category_id: "string",
      judul: "string",
      keterangan: "string",
    };

    console.log("PAYLOAD", payload);
  };

  return (
    <div className="mt-4">
      <div className="space-y-4">
        <div>
          <h1 className="font-semibold">
            Regulasi Inovasi Daerah - Dokumen Pendukung
          </h1>
          <h2 className="text-sm">-</h2>
        </div>
        <div>
          <h1 className="font-semibold">Parameter</h1>
          <h2 className="text-sm">-</h2>
        </div>
      </div>
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 mt-4 shadow-md">
        <Table
          showNum={true}
          data={[data?.data] || []}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
        />
      </div>
      <div className="w-full mt-8" style={{ height: "502px" }}>
        <iframe
          className="w-full h-full"
          src="https://pii.or.id/uploads/dummies.pdf"
          title="PDF"
        ></iframe>
      </div>
      <div className="mt-8 space-y-3">
        <h1 className="text-lg font-semibold">Data saat ini</h1>
        <div>
          <CustomRadioButton
            items={currentData}
            onChange={onHandleCurrentDataChange}
          />
        </div>
      </div>
      <div className="flex items-center w-full mt-8">
        <div className="w-1/2 pr-2">
          <SelectOption
            label="Kategori"
            placeholder="Pilih kategori"
            options={categories}
            onChange={onHandleCategoryChange}
            value={formData.category}
          />
        </div>
      </div>
      <ReactQuill
        className="mt-8"
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="mt-8">
        <Button
          onClick={onHandleSubmit}
          text="Simpan"
          icon={<BsFillCheckCircleFill />}
        />
      </div>
    </div>
  );
};

export default RegioanlInnovationReviewInnovationEvaluation;
