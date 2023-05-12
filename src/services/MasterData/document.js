import { BASE_API_URL } from "../../constans/constans";
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

    const result = await response.json();

    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    return [];
  } catch (error) {
    console.log(error);
  }
};

export const findDocument = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/dokumen/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const result = await response.json();

    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    return [];
  } catch (error) {
    console.log(error);
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
    formData.append("document", payload.document);

    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
      body: formData,
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error(result.message);
  } catch (error) {
    throw Error("Submit pengumuman error");
  }
};
