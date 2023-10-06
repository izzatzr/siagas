import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Chipper from "../../../../components/Chipper";
import { useQuery } from "react-query";
import {
  GET_ALL_INDICATOR,
  GET_PEMDA_PROFILE,
} from "../../../../constans/constans";
import { getPemdaProfiles } from "../../../../services/DatabaseInnovation/pemdaProfile";
import IndicatorList from "./IndicatorList";
import { getAllIndicator } from "../../../../services/MasterData/indicator";

const DetailItem = (props) => {
  const { label, value, download } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[#333] font-bold">{label}</div>
      <div className="flex gap-2 items-center">
        <div className="text-[#333]">{value}</div>
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

const initialIndicatorFilterParams = {
  page: 1,
  limit: 10,
};

const Detail = () => {
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

  const { data } = useQuery([GET_PEMDA_PROFILE], getPemdaProfiles(currentId), {
    enabled: !!currentId,
  });

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Profile Pemda</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/profil-pemda">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">Detail Profil Pemda</span>
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
            <DetailItem label={"Nama Daerah"} value={data?.data?.nama_daerah} />
            <DetailItem
              label={"Nama Pemda"}
              value={data?.data?.user?.nama_pemda}
            />
            <DetailItem
              label={"OPD Yang Menangani"}
              value={data?.data?.opd_yang_menangani}
            />
            <DetailItem
              label={"Alamat Pemda"}
              value={data?.data?.alamat_pemda}
            />
            <DetailItem label={"E-mail"} value={data?.data?.user?.email} />
            <DetailItem label={"No. Tel"} value={data?.data?.no_telpon} />
            <DetailItem label={"Nama Admin"} value={data?.data?.nama_admin} />
            <DetailItem
              label={"Dokumen Penelitian"}
              value={data?.data?.document?.name}
              download={data?.data?.document}
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

export default Detail;
