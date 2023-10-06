import React from "react";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { GET_ALL_OPD } from "../../../constans/constans";
import { deleteOPD, getAllOPD } from "../../../services/Configuration/opd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const OPDList = () => {
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
      key: "name",
      title: "Nama OPD",
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
      onClick: (value) => {
        navigate(`/konfigurasi/daftar-opd/edit/${value.id}`);
      },
    },
    {
      code: DELETE_ACTION_TABLE,
      onClick: (item) => {
        setCurrentItem(item);
        setShowDelete(true);
      },
    },
  ];

  const { isLoading, data } = useQuery(
    [GET_ALL_OPD, filterParams],
    getAllOPD(filterParams)
  );

  const deleteOPDMutation = useMutation(deleteOPD);

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
    deleteOPDMutation.mutate(currentItem?.id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);
        if (res.code) {
          queryClient.invalidateQueries([GET_ALL_OPD]);

          snackbar("Berhasil menghapus OPD", () => {
            navigate("/konfigurasi/daftar-opd");
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
          message="Apakah Anda yakin ingin menghapus OPD"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <Toolbar
        title="Daftar OPD"
        linkButton="/konfigurasi/daftar-opd/tambah"
        linkButtonText="Tambah OPD"
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

export default OPDList;
