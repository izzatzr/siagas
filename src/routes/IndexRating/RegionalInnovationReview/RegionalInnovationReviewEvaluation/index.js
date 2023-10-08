import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRegionalInnovationReviewById,
  getRegionalInnovationReviewByIndicator,
  getRegionalInnovationReviewEvaluation,
  postRegionalInnovationReviewEvaluation,
} from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import { useUtilContexts } from "../../../../context/Utils";
import {
  GET_ALL_DOCUMENT_REGIONAL_INNOVATION_QUERY_KEY,
  GET_ALL_REGIONAL_INNOVATION_REVIEW_BY_ID,
  GET_REGIONAL_INNOVATION_REVIEW_EVALUATION,
} from "../../../../constans/constans";
import Table from "../../../../components/Table";
import { DOWNLOAD_TABLE } from "../../../../constants";
import TableAction from "../../../../components/TableAction";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import SelectOption from "../../../../components/SelectOption";
import ReactQuill from "react-quill";
import Button from "../../../../components/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { getAllDocumentRegionalInnovation } from "../../../../services/DatabaseInnovation/regional";
import { downloadFile } from "../../../../utils";

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

const supportDocumentInitialFilterParams = {
  page: 1,
  limit: 20,
};

const RegioanlInnovationReviewInnovationEvaluation = () => {
  const params = useParams();
  const currentId = params.id;
  const currentEvaluationId = params?.evaluationId;
  const [formData, setFormData] = React.useState(initialForm);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [supportDocumentFilterParams, setSupportDocumentFilterParams] =
    React.useState({
      ...supportDocumentInitialFilterParams,
      indicator_id: currentEvaluationId,
    });

  const navigate = useNavigate();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, data: evaluationData } = useQuery(
    [GET_REGIONAL_INNOVATION_REVIEW_EVALUATION],
    getRegionalInnovationReviewEvaluation(currentId, currentEvaluationId),
    {
      enabled: !!currentId && !!currentEvaluationId,
      onSuccess: (res) => {
        setFormData({
          ...formData,
          currentData: res?.data?.data_saat_ini,
          category: {
            name: res?.data?.kategori,
            value: res?.data?.kategori,
          },
          description : res?.data?.keterangan
        });
      },
    }
  );

  const { isLoading: isLoadingRegionalInnovationReview } = useQuery(
    [GET_ALL_REGIONAL_INNOVATION_REVIEW_BY_ID],
    getRegionalInnovationReviewById(currentId),
    {
      onSuccess: (res) => {
        setSupportDocumentFilterParams({
          ...supportDocumentFilterParams,
          inovasi_id: res?.data?.inovasi_id,
        });
      },
      enabled: !!currentEvaluationId,
    }
  );

  const { data: supportDocumentData, isLoading: isLoadingSupportDocument } =
    useQuery(
      [GET_ALL_DOCUMENT_REGIONAL_INNOVATION_QUERY_KEY],
      getAllDocumentRegionalInnovation(supportDocumentFilterParams),
      {
        enabled: !!supportDocumentFilterParams?.inovasi_id,
      }
    );

  const postRegionalInnovationReviewEvaluationMutation = useMutation(
    postRegionalInnovationReviewEvaluation
  );

  const actionTableData = [
    {
      code: DOWNLOAD_TABLE,
      onClick: (item) => {
        const fileName = item?.file?.name?.replace(item?.file?.extention, "");
        downloadFile(item?.file?.full_path, fileName);
      },
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
      key: "tentang",
      title: "Tentang",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  React.useEffect(() => {
    if (
      isLoading &&
      isLoadingRegionalInnovationReview &&
      isLoadingSupportDocument
    ) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoadingRegionalInnovationReview, isLoadingSupportDocument, isLoading]);

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
      data_saat_ini: formData?.currentData,
      kategori: formData?.category?.value,
      keterangan: formData?.description,
      id: currentId,
      indikator_id: currentEvaluationId,
    };

    if (evaluationData?.data?.evaluasi_id) {
      payload["evaluasi_id"] = evaluationData?.data?.evaluasi_id;
    }

    setLoadingUtil(true);
    postRegionalInnovationReviewEvaluationMutation.mutate(payload, {
      onSuccess: (res) => {
        alert("Berhasil menilai evaluasi");
      },
      onError: () => {
        alert("Gagal menilai evaluasi");
      },
      onSettled: () => {
        setLoadingUtil(false);
      },
    });
  };

  return (
    <div className="mt-4">
      <div className="w-full rounded-lg text-[#333333] bg-white p-6 mt-4 shadow-md">
        <Table
          showNum={true}
          data={supportDocumentData?.data}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
        />
      </div>
      <div className="w-full mt-8" style={{ height: "502px" }}>
        <iframe
          className="w-full h-full"
          src={supportDocumentData?.data[0]?.file?.full_path}
          title="PDF"
        ></iframe>
      </div>
      <div className="mt-8 space-y-3">
        <h1 className="text-lg font-semibold">Data saat ini</h1>
        <div>
          <CustomRadioButton
            items={currentData}
            onChange={onHandleCurrentDataChange}
            value={formData?.currentData}
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
        value={formData?.description}
        onChange={(value) => {
          setFormData({
            ...formData,
            description: value,
          });
        }}
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
