import React from "react";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { GET_ALL_UPDT } from "../../../constans/constans";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { deleteUPTD, getAllUPTD } from "../../../services/Configuration/updt";
import { useUtilContexts } from "../../../context/Utils";
import { useNavigate } from "react-router-dom";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const UPTDList = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const navigate = useNavigate();
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const queryClient = useQueryClient();

  const tableHeader = [
    {
      key: "created_by",
      title: "Dibuat Oleh",
    },
    {
      key: "regionalApparatus.name",
      title: "OPD",
    },
    {
      key: "name",
      title: "Nama Unit Sekolah/Puskesmas",
    },
    {
      key: "form-action",
      title: "Aksi",
      render: (item) => <TableAction data={actionTableData} itemData={item} />,
    },
  ];

  const actionTableData = [
    {
      code: EDIT_ACTION_TABLE,
      label : "Edit",
      onClick: (value) => {
        navigate(`/konfigurasi/daftar-uptd/edit/${value.id}`);
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      label : "Hapus",
      onClick: (item) => {
        setCurrentItem(item);
        setShowDelete(true);
      },
    },
  ];

  const { isLoading, data } = useQuery(
    [GET_ALL_UPDT, filterParams],
    getAllUPTD(filterParams)
  );

  const deleteUPTDMutation = useMutation(deleteUPTD);

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  const onHandlePagination = (page) => {
    setFilterParams({
      ...filterParams,
      page: page + 1,
    });
  };

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

  const onHandleDelete = () => {
    setShowDelete(false);
    setLoadingUtil(true);
    deleteUPTDMutation.mutate(currentItem?.id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);
        if (res.code) {
          queryClient.invalidateQueries([GET_ALL_UPDT]);

          snackbar("Berhasil menghapus UPTD", () => {
            navigate("/konfigurasi/daftar-uptd");
          });
        }
      },
    });
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      {showDelete && (
        <ModalConfirmation
          variant="delete"
          message="Apakah Anda yakin ingin menghapus UPTD"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <Toolbar
        title="Daftar Unit Sekolah/Puskesmas"
        linkButton="/konfigurasi/daftar-uptd/tambah"
        linkButtonText="Tambah UPTD"
        search={true}
        onSearch={(e) => onHandleSearch(e.target.value)}
      />

      <div className="w-full px-6 py-4 bg-white rounded-lg">
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

export default UPTDList;
