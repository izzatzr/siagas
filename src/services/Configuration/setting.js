import { BASE_API_URL } from "../../constans/constans";
import { convertQueryString, getToken } from "../../utils";

export const getAllSetting = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/setting?${paramsQueryString}`,
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

export const getSetting = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/setting/${id}`, {
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

export const createSetting = async ({ helper, value, key }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/setting`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        helper,
        value,
        key,
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
    console.log("Error");
  }
};

export const updateSetting = async ({ id, helper, value, key }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/setting/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        helper,
        value,
        key,
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

export const deleteSetting = async (id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/setting/${id}`, {
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
