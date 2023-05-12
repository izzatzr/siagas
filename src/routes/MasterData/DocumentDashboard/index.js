import React from "react";
import { BiPlus, BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "../../../components/SelectOption";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import Table from "../../../components/Table";
import { useQuery } from "react-query";
import { getAllDocuments } from "../../../services/MasterData/document";
import { GET_ALL_DOCUEMNT } from "../../../constans/constans";

const initialFilter = {
  page: 1,
  limit: 20,
  q: "",
  category: "",
};

const DocumentDashboard = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilter);
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      onClick: (value) => {
        navigate(`/master/dokumen/edit/${value.id}`);
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      onClick: (value) => {
        setCurrentItem(value);
        setShowDelete(true);
      },
    },
  ];

  const tableHeader = [
    {
      key: "category.name",
      title: "Kategori",
    },
    {
      key: "title",
      title: "Judul",
    },
    {
      key: "content",
      title: "Deskripsi",
    },
    {
      key: "document.name",
      title: "File Dokumen",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

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

  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_DOCUEMNT, filterParams],
    getAllDocuments(filterParams)
  );

  const onHandleSearch = (value) => {
    if (value.length > 3) {
      setFilterParams({
        q: value,
      });
    } else if (value.length === 0) {
      setFilterParams({
        q: "",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] font-medium text-2xl">Dokumen</div>
      <div className="flex justify-end items-center gap-2">
        <Link
          to="/master/dokumen/tambah"
          className="text-sm text-white flex items-center gap-2 rounded-lg bg-[#069DD9] cursor-pointer hover:bg-[#1d8bb7] p-[10px] mt-5"
        >
          <BiPlus className="text-base" />
          Tambah Dokumen
        </Link>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6 flex items-end justify-between">
        <div className="w-[30%]">
          <SelectOption
            label="Kategori"
            placeholder="Pilih Kategori"
            options={categories}
          />
        </div>
        <div className="flex items-center gap-3 text-sm border border-[#333333] placeholder:text-[#828282] rounded px-3 py-2 w-[30%]">
          <BiSearch />
          <input
            type="text"
            className="outline-none"
            placeholder="Pencarian"
            onChange={(e) => onHandleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full rounded-lg bg-white py-4 px-6">
        <div className="overflow-x-scroll">
          <Table showNum={true} data={data?.data || []} columns={tableHeader} />
        </div>
      </div>
    </div>
  );
};

export default DocumentDashboard;
