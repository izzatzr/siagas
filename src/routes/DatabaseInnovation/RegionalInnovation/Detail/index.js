import React from "react";
import { Link, useParams } from "react-router-dom";
import Chipper from "../../../../components/Chipper";
import {
  GET_ALL_INDICATOR,
  GET_REGIONAL_INNOVATION_QUERY_KEY,
} from "../../../../constans/constans";
import { getAllIndicator } from "../../../../services/MasterData/indicator";
import { useQuery } from "react-query";
import { BiArrowBack } from "react-icons/bi";
import { getRegionalInnovation } from "../../../../services/DatabaseInnovation/regional";
import IndicatorList from "./IndicatorList";

const initialIndicatorFilterParams = {
  page: 1,
  limit: 10,
  jenis_indikator: "si",
};

const DetailItem = (props) => {
  const { label, value, download, isHtml } = props;

  if (isHtml) {
    console.log("VALUE", value);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[#333] font-bold">{label}</div>
      <div className="flex gap-2 items-center">
        {isHtml ? (
          <div
            className="text-[#333]"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div className="text-[#333]">{value}</div>
        )}
        {download && (
          <Link
            to={download?.full_path}
            download={download?.name}
            target="_blank"
            rel="noreferrer"
            className="text-[#069DD9]"
          >
            Download
          </Link>
        )}
      </div>
    </div>
  );
};

const RegionalInnovationDetail = () => {
  const [indicatorFilterParams, setIndicatorFilterParams] = React.useState(
    initialIndicatorFilterParams
  );
  const params = useParams();
  const currentId = params.id;

  const [tabActive, setTabActive] = React.useState(0);

  const { data: indicators } = useQuery(
    [GET_ALL_INDICATOR, indicatorFilterParams],
    getAllIndicator(indicatorFilterParams)
  );

  const { data } = useQuery(
    [GET_REGIONAL_INNOVATION_QUERY_KEY],
    getRegionalInnovation(currentId),
    {
      enabled: !!currentId,
    }
  );

  console.log(data?.data);

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Inovasi Daerah</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/inovasi-daerah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">Detail Inovasi Daerah</span>
        </div>
        <div className="flex items-center w-full gap-3">
          <Chipper
            active={tabActive === 0}
            label="Profil Inovasi"
            onClick={() => {
              setTabActive(0);
            }}
          />
          <Chipper
            active={tabActive === 1}
            label="Indikator"
            onClick={() => {
              setTabActive(1);
            }}
          />
        </div>
        {tabActive === 0 && (
          <div className="flex flex-col gap-6">
            <DetailItem
              label={"Nama Pemda"}
              value={data?.data?.government_name}
            />
            <DetailItem
              label="Nama Inovasi"
              value={data?.data?.innovation_name}
            />

            <DetailItem
              label="Tahapan Inovasi"
              value={data?.data?.innovation_phase}
            />

            <DetailItem
              label="Inisiator Inovasi Daerah"
              value={data?.data?.innovation_initiator}
            />

            <DetailItem
              label="Jenis Inovasi"
              value={data?.data?.innovation_type || "-"}
            />

            <DetailItem
              label="Bentuk Inovasi Daerah"
              value={data?.data?.innovation_form || "-"}
            />

            <DetailItem label="Tematik" value={data?.data?.thematic || "-"} />

            <DetailItem label="Waktu Uji Coba" value={data?.data?.trial_time|| "-"} />
            <DetailItem
              label="Waktu Penerapan"
              value={data?.data?.implementation_time|| "-"}
            />
            <DetailItem
              label="Nama Admin"
              value={data?.data?.pemda?.full_name || "-"}
            />

            <DetailItem
              isHtml
              label="Rancang Bangun"
              value={data?.data?.design || ""}
            />

            <DetailItem
              isHtml
              label="Tujuan Inovasi Daerah"
              value={data?.data?.purpose || ""}
            />

            <DetailItem
              isHtml
              label="Manfaat Inovasi Daerah"
              value={data?.data?.benefit || ""}
            />

            <DetailItem
              isHtml
              label="Hasil Inovasi"
              value={data?.data?.result || ""}
            />
          </div>
        )}

        {tabActive === 1 && (
          <IndicatorList
            data={indicators}
            params={indicatorFilterParams}
            setIndicatorFilterParams={setIndicatorFilterParams}
          />
        )}
      </div>
    </div>
  );
};

export default RegionalInnovationDetail;
