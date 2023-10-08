import { useQuery } from "react-query";
import {
  GET_ALL_INDICATOR,
  GET_REGIONAL_INNOVATION_REVIEW_BY_INDICATOR,
} from "../../../../constans/constans";
import { getRegionalInnovationReviewByIndicator } from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useUtilContexts } from "../../../../context/Utils";
import { FaFileExport, IconName } from "react-icons/fa";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";
import { getAllIndicator } from "../../../../services/MasterData/indicator";

const indicatorInitialFilterParams = {
  page: 1,
  limit: 10,
  jenis_indikator: "si",
};

const RegionalInnovationReviewIndicator = () => {
  const [indicatorFilterParams, setIndicatorFilterParams] = React.useState(
    indicatorInitialFilterParams
  );

  const params = useParams();
  const currentId = params.id;

  const navigate = useNavigate();
  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, isError, data, error } = useQuery(
    [GET_ALL_INDICATOR, indicatorFilterParams],
    getAllIndicator(indicatorFilterParams)
  );

  const tableHeader = [
    {
      key: "nama_indikator",
      title: "Nama Indikator",
    },
    {
      key: "",
      title: "Informasi",
      render : (item) => {
        return <div className="max-w-[400px] max-h-40">
          <div dangerouslySetInnerHTML={{__html : item?.keterangan}}></div>
        </div>
      }
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
                `/review-inovasi-daerah/detail/${currentId}/evaluation/${data.id}`
              )
            }
          />
        );
      },
    },
  ];

  const onHandlePagination = (page) => {
    setIndicatorFilterParams({
      ...params,
      page: page + 1,
    });
  };

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
      <Pagination
        pageCount={data?.pagination?.pages}
        onHandlePagination={onHandlePagination}
        totalData={data?.pagination?.total}
        size={params?.limit}
      />
    </div>
  );
};

export default RegionalInnovationReviewIndicator;
