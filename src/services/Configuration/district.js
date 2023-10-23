import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../utils";

export const getAllDistrict = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/distrik?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    if (response.status === 200) {
      const result = await processResult(response);

      const isSuccess = result.code === 200;

      if (isSuccess) {
        return result;
      }
    }

    throw Error("Terjadi kesalahan");
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};

export const findDistrict = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/distrik/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    if (response.status === 200) {
      const result = await processResult(response);

      const isSuccess = result.code === 200;

      if (isSuccess) {
        return result;
      }
    }

    throw Error("Terjadi kesalahan");
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};

export const submitDistrict = async (payload) => {
  try {
    const url = `${BASE_API_URL}/distrik${payload?.id ? "/" + payload?.id : ""}`;

    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      const result = await processResult(response);

      const isSuccess = result.code === 200;

      if (isSuccess) {
        return result;
      }
    }

    throw Error("Terjadi kesalahan");
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};

export const deleteDistrict = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/distrik/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
      method: "DELETE",
    });

    if (response.status === 200) {
      const result = await processResult(response);

      const isSuccess = result.code === 200;

      if (isSuccess) {
        return result;
      }
    }

    throw Error("Terjadi kesalahan");
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};
