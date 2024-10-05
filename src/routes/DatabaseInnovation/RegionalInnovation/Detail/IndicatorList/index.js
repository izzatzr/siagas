import React from "react";
import Table from "../../../../../components/Table";
import TableAction from "../../../../../components/TableAction";
import { TRANSFER_ACTION_TABLE } from "../../../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../../../components/Pagination";
import { AiFillCheckCircle } from "react-icons/ai";

const IndicatorList = (props) => {
  const { data, setIndicatorFilterParams, params, etcData } = props;
  const navigate = useNavigate();
  const location = useLocation();

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
          <div className="w-[400px] max-h-20 overflow-scroll">
            <div dangerouslySetInnerHTML={{ __html: item?.keterangan }}></div>
          </div>
        );
      },
    },
    {
      key: "",
      title: "Dokumen Pendukung",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }} className="flex">
            {(etcData ?? []).filter((e) => e?.indikator_id === item.id)[0]?.files.length > 0 ?
              <AiFillCheckCircle color="green" className="mx-2" /> :
              <div />}
            <TableAction
              data={[
                {
                  code: TRANSFER_ACTION_TABLE,
                  onClick: () => {
                    navigate(`${item.id}/dokumen-pendukung`, {
                      state: {
                        urlBefore: location?.pathname,
                      },
                    });
                  },
                },
              ]}
            />
          </div>
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

  return (
    <div>
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

export default IndicatorList;
