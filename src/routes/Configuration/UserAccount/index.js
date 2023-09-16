import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import Toolbar from "../../../components/Toolbar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { GET_ALL_USER_ACCOUNT } from "../../../constans/constans";
import {
  deleteUserAccount,
  getAllUserAccounts,
} from "../../../services/Configuration/userAccount";
import { DELETE_ACTION_TABLE, EDIT_ACTION_TABLE } from "../../../constants";
import TableAction from "../../../components/TableAction";
import Pagination from "../../../components/Pagination";
import { useUtilContexts } from "../../../context/Utils";
import ModalConfirmation from "../../../components/ModalConfirmation";

const initialFilterParams = {
  limit: 20,
  page: 0,
  q: "",
};

const UserAccount = () => {
  const [filterParams, setFilterParams] = React.useState(initialFilterParams);
  const [showDelete, setShowDelete] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const tableHeader = [
    {
      key: "role.name",
      title: "Role",
    },
    {
      key: "nama_pemda",
      title: "Daerah",
    },
    {
      key: "username",
      title: "Username",
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
        navigate(`/konfigurasi/user-account/edit/${value.id}`);
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

  const { isLoading, data: userData } = useQuery(
    [GET_ALL_USER_ACCOUNT, filterParams],
    getAllUserAccounts(filterParams)
  );

  const deleteUserAccountMutation = useMutation(deleteUserAccount);

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
    deleteUserAccountMutation.mutate(currentItem?.id, {
      onSuccess: (res) => {
        setLoadingUtil(false);
        setCurrentItem(null);
        if (res.code) {
          queryClient.invalidateQueries([GET_ALL_USER_ACCOUNT]);

          snackbar("Berhasil menghapus akun user", () => {
            navigate("/konfigurasi/user-account");
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
          message="Apakah Anda yakin ingin menghapus user"
          onCancel={() => setShowDelete(false)}
          onConfirm={onHandleDelete}
        />
      )}

      <Toolbar
        title="User Account"
        linkButton="/konfigurasi/user-account/tambah"
        linkButtonText="Tambah Akun"
        search={true}
        onSearch={(e) => onHandleSearch(e.target.value)}
      />

      <div className="w-full px-6 py-4 bg-white rounded-lg">
        <Table
          showNum={true}
          data={userData?.data || []}
          columns={tableHeader}
          action={<TableAction data={actionTableData} />}
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

export default UserAccount;
