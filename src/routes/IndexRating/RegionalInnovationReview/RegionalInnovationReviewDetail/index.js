import { useQuery } from "react-query";
import { getRegionalInnovationReviewById } from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import { GET_ALL_REGIONAL_INNOVATION_REVIEW_BY_ID } from "../../../../constans/constans";
import { useUtilContexts } from "../../../../context/Utils";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import FilterOption from "../../../../components/FilterOption";

const filters = [
  {
    name: "Profil Inovasi",
    value: "Profil Inovasi",
  },
  {
    name: "Indikator",
    value: "Indikator",
  },
];

const RegionalInnovationReviewDetail = () => {
  const params = useParams();
  const currentId = params.id;

  const location = useLocation();
  const navigate = useNavigate();

  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, data } = useQuery(
    [GET_ALL_REGIONAL_INNOVATION_REVIEW_BY_ID],
    getRegionalInnovationReviewById(currentId)
  );

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const onHandleFilterChange = (phase) => {
    if (phase === filters[0].value) {
      navigate("");
    } else if (phase === filters[1].value) {
      navigate("indicator");
    }
  };

  const navigateBack = () => {
    navigate("/review-inovasi-daerah");
  };

  if (!isLoading) {
    return (
      <div className="flex flex-col w-full gap-6 py-6">
        <div className="text-[#333333] text-2xl">Review Inovasi Daerah</div>

        <div className="w-full rounded-lg text-[#333333] bg-white p-6">
          <div className="flex mb-5 space-x-3">
            <div className="cursor-pointer" onClick={navigateBack}>
              <BiLeftArrowAlt size="2em" />
            </div>
            <div className="text-lg font-semibold">{data.data.judul}</div>
          </div>

          {!location.pathname.includes("evaluation") && (
            <FilterOption
              defaultValue={filters[0].value}
              items={filters}
              onFilterChange={onHandleFilterChange}
            />
          )}

          <Outlet />
        </div>
      </div>
    );
  }
};

export default RegionalInnovationReviewDetail;
