import React from "react";
import StatisticData from "../StatisticData";
import GovernementAffairs from "../GovernementAffairs";
import { convertQueryString, getToken } from "../../../../../utils";
import { BASE_API_URL } from "../../../../../constans/constans";

const initialParamsOPD = {
  limit: 20,
  page: 1,
  q: "",
};

const StatisticWrapper = () => {
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  React.useEffect(() => {
    getOPD().then((data) => {
      setSelectedOPD(data.data[0]);
    });
  }, []);

  const getOPD = async (search = "") => {
    const paramsQueryString = convertQueryString({
      ...initialParamsOPD,
      q: search,
    });
    const response = await fetch(`${BASE_API_URL}/opd?${paramsQueryString}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const responseJSON = await response.json();

    return responseJSON;
  };

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
    const res = await getOPD(search);

    const data = {
      options: res?.data,
      hasMore: res.has_more,
      additional: {
        page: page + 1,
      },
    };

    return data;
  };

  const onHandleOPDChange = (opd) => {
    setSelectedOPD(opd);
  };

  return (
    <>
      <StatisticData
        pemda={selectedOPD}
        pemdaOptions={loadOptionOPD}
        onHandleOPDChange={onHandleOPDChange}
      />
      <GovernementAffairs pemda={selectedOPD} />
    </>
  );
};

export default StatisticWrapper;
