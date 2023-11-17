import { useQuery } from "react-query";
import { BASE_API_URL, GET_ALL_INDICATOR } from "../../../../constans/constans";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useUtilContexts } from "../../../../context/Utils";
import { FaFileExport } from "react-icons/fa";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";
import { getAllIndicator } from "../../../../services/MasterData/indicator";
import { getToken } from "../../../../utils";
import {
  convertCurrentDataScore,
  convertEvaluationScore,
} from "../../../../helpers/common";

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

  const [indicators, setIndicators] = useState([]);

  const {
    isFetching,
    isFetched,
    isError,
    data: indicatorData,
    error,
    status,
  } = useQuery(
    [GET_ALL_INDICATOR, indicatorFilterParams],
    getAllIndicator(indicatorFilterParams)
  );

  const skorEvaluasi = async (indicator_id) => {
    const response = await fetch(
      `${BASE_API_URL}/review_inovasi_daerah/${currentId}/indikator/${indicator_id}/evaluasi`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );
    const result = await response.json();

    const isSuccess = result.code === 200;

    if (isSuccess) {
      return {
        ...result?.data,
        indicator_id: indicator_id.toString(),
      };
    }

    return {};
  };

  useEffect(() => {
    if (status === "success" && isFetched) {
      const tempData = [];
      const promiseArray = [];
      indicatorData.data.forEach(async (item) => {
        promiseArray.push(skorEvaluasi(item?.id));
      });

      Promise.all(promiseArray).then((data) => {
        indicatorData.data.forEach((item) => {
          tempData?.push({
            ...item,
            data_saat_ini:
              convertCurrentDataScore(
                data?.find(
                  (evaluasi) => evaluasi?.indicator_id === item.id?.toString()
                )?.data_saat_ini
              ) ?? "-",
            skor_evaluasi:
              data?.find(
                (evaluasi) => evaluasi?.indicator_id === item.id?.toString()
              )?.data_saat_ini &&
              data?.find(
                (evaluasi) => evaluasi?.indicator_id === item.id?.toString()
              )?.kategori
                ? convertEvaluationScore(
                    data?.find(
                      (evaluasi) =>
                        evaluasi?.indicator_id === item.id?.toString()
                    )?.data_saat_ini ?? 0,
                    data?.find(
                      (evaluasi) =>
                        evaluasi?.indicator_id === item.id?.toString()
                    )?.kategori ?? 0
                  )
                : "-",
          });
        });

        setIndicators(tempData);
      });
    }
  }, [status, indicatorData]);

  const tableHeader = [
    {
      key: "nama_indikator",
      title: "Nama Indikator",
    },
    {
      key: "",
      title: "Informasi",
      render: (item) => {
        return (
          <div className="max-w-[400px] max-h-40">
            <div dangerouslySetInnerHTML={{ __html: item?.keterangan }}></div>
          </div>
        );
      },
    },
    {
      key: "data_saat_ini",
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
      ...indicatorFilterParams,
      page: page + 1,
    });
  };

  React.useEffect(() => {
    setLoadingUtil(isFetching);
  }, [isFetching]);

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full rounded-lg text-[#333333] bg-white p-6">
      <Table showNum={true} data={indicators || []} columns={tableHeader} />
      <Pagination
        pageCount={indicatorData?.pagination?.pages}
        onHandlePagination={onHandlePagination}
        totalData={indicatorData?.pagination?.total}
        size={params?.limit}
      />
    </div>
  );
};

export default RegionalInnovationReviewIndicator;
