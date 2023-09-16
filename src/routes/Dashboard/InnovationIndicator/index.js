import React from "react";
import { BiDownload } from "react-icons/bi";
import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";
import SelectOption from "../../../components/SelectOption";
import { useQuery } from "react-query";
import {
  BASE_API_URL,
  GET_INDICATOR_STATISTIC,
} from "../../../constans/constans";
import { getIndicatorStatistic } from "../../../services/Dashboard/InnovationIndicator/innovationIndicator";
import { useUtilContexts } from "../../../context/Utils";
import { convertQueryString, getToken } from "../../../utils";

const categories = [
  {
    value: "category 1",
    label: "Category 1",
  },
  {
    value: "category 2",
    label: "Category 2",
  },
  {
    value: "category 3",
    label: "Category 3",
  },
  {
    value: "category 4",
    label: "Category 4",
  },
];

const regions = [
  {
    value: "wilayah 1",
    label: "Wilayah 1",
  },
  {
    value: "wilayah 2",
    label: "Wilayah 2",
  },
  {
    value: "wilayah 3",
    label: "Wilayah 3",
  },
  {
    value: "wilayah 4",
    label: "Wilayah 4",
  },
];

const initialFilter = {
  pemda_id: 0,
};

const initialParamsOPD = {
  limit: 20,
  page: 1,
  q: "",
};

const InnovationIndicator = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const [selectedOPD, setSelectedOPD] = React.useState(null);

  const { isLoading, data: indicatorData } = useQuery(
    [GET_INDICATOR_STATISTIC, filterParams],
    getIndicatorStatistic(filterParams)
  );

  const { setLoadingUtil } = useUtilContexts();

  const loadOptionOPD = async (search, loadedOptions, { page }) => {
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

    return {
      options: responseJSON?.data,
      hasMore: responseJSON.has_more,
      additional: {
        page: page + 1,
      },
    };
  };

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const onHandleOPDChange = (opd) => {
    setSelectedOPD(opd);
    setFilterParams({
      ...filterParams,
      pemda_id: opd.id,
    });
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">
        Statistik Indikator Inovasi
      </div>
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="float-right w-40">
            <Button
              text="Unduh semua"
              icon={<BiDownload size="16" />}
              padding="p-[10px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 p-6 bg-white rounded-lg">
          {/* <SelectOption
            label="Kategori"
            placholder="Pilih Kategori"
            options={categories}
          />
          <SelectOption
            label="Wilayah"
            placholder="Pilih Wilayah"
            options={regions}
          /> */}
          <SelectOption
            label="Pemda"
            placeholder="Pilih Pemda"
            options={loadOptionOPD}
            onChange={(e) => onHandleOPDChange(e)}
            value={selectedOPD}
            paginate
          />
        </div>
        <div className="w-full rounded-lg flex flex-col gap-[20px] text-[#333333] bg-white p-4">
          <div className="text-[#333333] text-xl font-bold">
            Indikator Daerah
          </div>
          {indicatorData?.data.map((indicator) => (
            <ProgressBar
              key={indicator.id}
              label={indicator.nama_indikator}
              total={indicator.total_indikator}
              completed={indicator.total_indikator}
              filledValue={indicator.jumlah_upload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InnovationIndicator;
