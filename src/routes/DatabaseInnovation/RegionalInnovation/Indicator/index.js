import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GET_INDICATOR_REGIONAL_INNOVATION_QUERY_KEY } from "../../../../constans/constans";
import { getIndicatorRegionalInnovation } from "../../../../services/DatabaseInnovation/regional";
import { BiSearch } from "react-icons/bi";
import TableAction from "../../../../components/TableAction";
import { EDIT_ACTION_TABLE } from "../../../../constants";
import Table from "../../../../components/Table";
import { IoMdCloudUpload } from "react-icons/io";
import Pagination from "../../../../components/Pagination";

const initialParams = {
  limit: 10,
  page: 0,
  q: "",
};

const IndicatorRegionalInnovation = () => {
  const params = useParams();
  const regionalId = params.id;
  const navigate = useNavigate();

  const [filterParams, setFilterParams] = React.useState(initialParams);
  const [openInputParams, setOpenInputParams] = React.useState(false);

  const { data } = useQuery(
    [GET_INDICATOR_REGIONAL_INNOVATION_QUERY_KEY, filterParams],
    getIndicatorRegionalInnovation(regionalId),
    {
      enabled: !!regionalId,
    }
  );

  const onHandleSarch = (e) => {
    const { value } = e.target;
    setFilterParams({
      ...filterParams,
      q: value,
    });
  };

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

  const onHandleCloseForm = () => {
    setOpenInputParams(false);
  };

  const tableHeader = [
    {
      key: "indikator.nama_indikator",
      title: "Nama Indikator",
    },
    {
      key: "indikator.keterangan",
      title: "Keterangan",
    },
    {
      key: "informasi",
      title: "Informasi",
    },
    {
      key: "nilai",
      title: "Bobot",
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
                    setOpenInputParams(true);
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
      title: "Data Pendukung",
      render: (item) => {
        return (
          <div style={{ marginLeft: 10 }} className="w-56 flex flex-col">
            Lorem ipsum dolor sit amet consectetur. Pellentesque.
            <div className="flex items-center gap-2 text-[#069DD9] font-medium cursor-pointer">
              Upload
              <IoMdCloudUpload />
            </div>
          </div>
        );
      },
    },
    {
      key: "indikator.jenis_indikator",
      title: "Jenis File",
    },
  ];

  return (
    <>
      {openInputParams && (
        <div className="flex items-center justify-center fixed left-0 top-0 bottom-0 right-0 ">
          <div
            className="w-full h-full absolute bg-black/20"
            onClick={onHandleCloseForm}
          ></div>
          <div className="flex flex-col p-6 gap-6 bg-white rounded-lg z-10">
            <div className="flex items-center justify-between w-[607px]">
            <div className="text-[#333333] text-xl font-bold">
                Ubah Data Indikator
              </div>

              <div
                className="font-bold text-[#BDBDBD] cursor-pointer"
                onClick={onHandleCloseForm}
              >
                Tutup
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-6 py-6">
        <div className="text-[#333333] text-2xl font-bold">Inovasi Daerah</div>
        <div className="flex flex-col gap-2">
          <div className="text-[#333333] text-lg font-bold">
            LAYANAN LANGSUNG KECAMATAN TANJUNGKARANG PUSAT (LALANG TKP)
          </div>
          <div className="text-[#333333] text-lg font-bold">
            Tahapan: Implementasi / Penerapan
          </div>
        </div>
        <div className="w-full rounded-lg text-[#333333] bg-white p-6 flex flex-col gap-4">
          <div className="">
            <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%] float-right">
              <BiSearch />
              <input
                type="text"
                className="outline-none"
                placeholder="Pencarian"
                onKeyDown={onHandleSarch}
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
          <Table showNum={true} data={data?.data || []} columns={tableHeader} />
          <Pagination
            pageCount={data?.pagination?.pages}
            onHandlePagination={onHandlePagination}
            totalData={data?.pagination?.total}
            size={filterParams.limit}
          />
        </div>
      </div>
    </>
  );
};

export default IndicatorRegionalInnovation;
