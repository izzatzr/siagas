import React from "react";
import Table from "../../../../../components/Table";
import TableAction from "../../../../../components/TableAction";
import { TRANSFER_ACTION_TABLE } from "../../../../../constants";
import { useLocation, useNavigate } from "react-router-dom";

const IndicatorList = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const tableHeader = [
    {
      key: "indicator.nama_indikator",
      title: "Nama Indikator",
    },
    {
      key: "informasi",
      title: "Informasi",
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
    {
      key: "nilai",
      title: "Skor",
    },
    {
      key: "nilai_sesudah",
      title: "Skor Verifikasi",
    },
    {
      key: "",
      title: "Verifikasi",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }}>
            <TableAction
              data={[
                {
                  code: TRANSFER_ACTION_TABLE,
                  onClick: () => {
                    alert("Not Implemented");
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table showNum={true} data={data || []} columns={tableHeader} />
    </div>
  );
};

export default IndicatorList;
