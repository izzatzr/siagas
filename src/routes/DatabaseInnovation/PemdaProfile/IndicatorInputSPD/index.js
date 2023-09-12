import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TableAction from "../../../../components/TableAction";
import {
  EDIT_ACTION_TABLE,
  TRANSFER_ACTION_TABLE,
} from "../../../../constants";
import { useQuery } from "react-query";
import { GET_ALL_INDICATOR_PEMDA_PROFILES } from "../../../../constans/constans";
import { getAllIndicatorPemdaProfile } from "../../../../services/DatabaseInnovation/pemdaProfile";
import Table from "../../../../components/Table";
import Pagination from "../../../../components/Pagination";

const initialFilterParams = {
  page: 0,
  limit: 20,
  q: "",
};

const IndicatorInputSPD = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentId = params.id;

  const [filterParams, setFilterParams] = React.useState({
    ...initialFilterParams,
    pemda_indikator_id: currentId,
  });

  const tableHeader = [
    {
      key: "indicator.nama_indikator",
      title: "Nama Indikator",
    },
    {
      key: "indicator.keterangan",
      title: "Keterangan",
    },
    {
      key: "informasi",
      title: "Informasi",
    },
    {
      key: "",
      title: "Input Parameter",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }}>
            <TableAction
              data={[
                {
                  code: EDIT_ACTION_TABLE,
                  onClick: () => {
                    navigate(`${item.id}/dokumen-pendukung`);
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
    {
      key: "",
      title: "Dokumen Pendukung",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }}>
            <TableAction
              data={[
                {
                  code: TRANSFER_ACTION_TABLE,
                  onClick: () => {
                    navigate(
                      `/profil-pemda/${currentId}/detail/${item.id}/dokumen-pendukung`,
                      {
                        state: {
                          urlBefore: location?.pathname,
                        },
                      }
                    );
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  const { data } = useQuery(
    [GET_ALL_INDICATOR_PEMDA_PROFILES, filterParams],
    getAllIndicatorPemdaProfile(filterParams)
  );

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Profil Pemda</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/profil-pemda">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">Input Indikator SPD</span>
        </div>
        <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        <Pagination
          pageCount={data?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={data?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default IndicatorInputSPD;
