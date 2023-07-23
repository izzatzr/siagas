import { convertQueryString, getToken } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";

export const getAllGovernmentBusiness = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/urusan_pemerintahan?${paramsQueryString}`
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

export const findGovernmentBusiness = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/urusan_pemerintahan/${id}`);

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

export const submitGovernmentBusiness = async (payload) => {
  try {
    const url = `${BASE_API_URL}/urusan_pemerintahan${
      payload?.id ? "/" + payload?.id : ""
    }`;
    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({ name: payload.name }),
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
