import React from "react";
import { useNavigate } from "react-router-dom";
import TableAction from "../../../components/TableAction";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GET_ALL_TUXEDO } from "../../../constans/constans";
import {
  deleteTuxedo,
  getAllTuxedo,
} from "../../../services/Configuration/tuxedo";
import Toolbar from "../../../components/Toolbar";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const Tuxedo = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const navigate = useNavigate();
  const { setLoadingUtil, snackbar } = useUtilContexts();
  const queryClient = useQueryClient();

  const tableHeader = [
    {
      key: "title",
      title: "Judul",
    },
    {
      key: "slug",
      title: "Slug",
    },
    {
      key: "section",
      title: "Section",
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
      onClick: (item) => {
        navigate(`/konfigurasi/tuxedo/edit/${item.id}`);
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

  const { isLoading, data: userData } = useQuery(
    [GET_ALL_TUXEDO, filterParams],
    getAllTuxedo(filterParams)
  );
  const deleteTuxedoMutation = useMutation(deleteTuxedo);

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
    console.log(value);
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
    deleteTuxedoMutation.mutate(currentItem?.id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);
        if (res.code) {
          queryClient.invalidateQueries([GET_ALL_TUXEDO]);

          snackbar("Berhasil menghapus Tuxedo", () => {
            navigate("/konfigurasi/tuxedo");
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
          message="Apakah Anda yakin ingin menghapus Tuxedo"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <Toolbar
        title="Tuxedo"
        linkButton="/konfigurasi/tuxedo/tambah"
        linkButtonText="Tambah Tuxedo"
        search={true}
        onSearch={(e) => onHandleSearch(e.target.value)}
      />

      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <Table
          showNum={true}
          data={userData?.data || []}
          columns={tableHeader}
        />
        <Pagination
          pageCount={userData?.pagination?.pages}
          onHandlePagination={onHandlePagination}
          totalData={userData?.pagination?.total}
          size={filterParams.limit}
        />
      </div>
    </div>
  );
};

export default Tuxedo;
