import { convertQueryString, getToken } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";

export const getAllWilayah = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/wilayah?${paramsQueryString}`,
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

export const findWilayah = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/wilayah/${id}`, {
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

export const submitWilayah = async (payload) => {
  try {
    const url = `${BASE_API_URL}/wilayah${
      payload?.id ? "/" + payload?.id : ""
    }`;
    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }
    console.log("ERROR", result.message);
  } catch (error) {
    console.log("ERROR", error);
  }
};
