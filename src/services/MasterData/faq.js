import { convertQueryString, getToken } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";

export const getAllFAQ = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(`${BASE_API_URL}/faq?${paramsQueryString}`, {
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

export const findFAQ = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/faq/${id}`, {
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

export const submitFAQ = async (payload) => {
  try {
    const url = `${BASE_API_URL}/faq${payload?.id ? "/" + payload?.id : ""}`;

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

export const deleteFAQ = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/faq/${id}`, {
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
