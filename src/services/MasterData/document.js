import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../utils";

export const getAllDocuments = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/dokumen?${paramsQueryString}`,
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

export const findDocument = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/dokumen/${id}`, {
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

export const submitDocument = async (payload) => {
  try {
    const url = `${BASE_API_URL}/dokumen${
      payload?.id ? "/" + payload?.id : ""
    }`;

    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("category_id", payload.category_id);
    formData.append("content", payload.content);
    if (payload?.document) {
      formData.append("document", payload.document);
    }

    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
      body: formData,
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

export const deleteDocument = async ({ id }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/dokumen/${id}`, {
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
