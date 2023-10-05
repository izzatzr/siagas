import { useQuery } from "react-query";
import { GET_REGIONAL_INNOVATION_REVIEW_BY_INDICATOR } from "../../../../constans/constans";
import { getRegionalInnovationReviewByIndicator } from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useUtilContexts } from "../../../../context/Utils";
import { FaFileExport, IconName } from "react-icons/fa";
import Table from "../../../../components/Table";
import ReactPaginate from "react-paginate";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const RegionalInnovationReviewIndicator = () => {
  const params = useParams();
  const currentId = params.id;

  const navigate = useNavigate();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, isError, data, error } = useQuery(
    [GET_REGIONAL_INNOVATION_REVIEW_BY_INDICATOR],
    getRegionalInnovationReviewByIndicator(currentId)
  );

  const tableHeader = [
    {
      key: "name",
      title: "Nama Indikator",
    },
    {
      key: "informasi",
      title: "Informasi",
    },
    {
      key: "skor",
      title: "Skor",
    },
    {
      key: "skor_evaluasi",
      title: "Skor Evaluasi",
    },
    {
      key: "evaluasi",
      title: "Evaluasi",
      render: (data) => {
        return (
          <FaFileExport
            className="cursor-pointer"
            onClick={() =>
              navigate(
                `/review-inovasi-daerah/detail/${currentId}/evaluation/${data.indikator_id}`
              )
            }
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full rounded-lg text-[#333333] bg-white p-6">
      <Table showNum={true} data={data?.data || []} columns={tableHeader} />
    </div>
  );
};

export default RegionalInnovationReviewIndicator;
