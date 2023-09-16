import { BASE_API_URL } from "../../constans/constans";
import { fetchData, getToken } from "../../utils";

export const getAllUserAccounts = (params) => async () => {
  try {
    const response = await fetchData({ params, endpoint: "user" });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserAccount = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const result = await response.json();

    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const createUserAccount = async ({
  password,
  username,
  email,
  namaPanggilan,
  namaPemda,
  namaLengkap,
  roleId,
}) => {
  try {
    const response = await fetch(`${BASE_API_URL}/user`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        password,
        username,
        email,
        nama_panggilan: namaPanggilan,
        nama_pemda: namaPemda,
        nama_lengkap: namaLengkap,
        role_id: roleId,
      }),
      method: "POST",
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error("Error");
  } catch (error) {
    throw error;
  }
};

export const updateUserAccount = async ({
  id,
  password,
  username,
  email,
  namaPanggilan,
  namaPemda,
  namaLengkap,
  roleId,
}) => {
  try {
    const response = await fetch(`${BASE_API_URL}/user/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        password,
        username,
        email,
        nama_panggilan: namaPanggilan,
        nama_pemda: namaPemda,
        nama_lengkap: namaLengkap,
        role_id: roleId,
      }),
      method: "PATCH",
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error("Error");
  } catch (error) {
    console.log("Error");
  }
};

export const deleteUserAccount = async (id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/user/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      method: "DELETE",
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error("Error");
  } catch (error) {
    console.log("Error");
  }
};
