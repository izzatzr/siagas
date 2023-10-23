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
      const firstOpd = {
        id: data?.data[0]?.id,
        label: data?.data[0]?.nama_daerah,
        value: `${data?.data[0]?.nama_daerah}_${data?.data[0]?.id}`,
      };
      setSelectedOPD(firstOpd);
    });
  }, []);

  const getOPD = async (search = "") => {
    const paramsQueryString = convertQueryString({
      ...initialParamsOPD,
      q: search,
    });
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const responseJSON = await response.json();

    return responseJSON;
  };

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
    const res = await getOPD(search);
    const results = [];

    res.data.map((item) => {
      results.push({
        id: item.id,
        label: item.nama_daerah,
        value: `${item.nama_daerah}_${item.id}`,
      });
    });

    return {
      options: results,
      hasMore: res.length >= 1,
      additional: {
        page: search ? 2 : page + 1,
      },
    };
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
      {/* <GovernementAffairs pemda={selectedOPD} /> */}
    </>
  );
};

export default StatisticWrapper;
