import { convertQueryString } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";

export const getAllRegional = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/daerah?${paramsQueryString}`
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

export const findRegional = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/daerah/${id}`);

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

export const submitRegional = async (payload) => {
  try {
    const url = `${BASE_API_URL}/daerah${
      payload?.id ? "/" + payload?.id : ""
    }`;
    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
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
