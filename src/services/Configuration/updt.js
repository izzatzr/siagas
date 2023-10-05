import { BASE_API_URL } from "../../constans/constans";
import { convertQueryString, getToken } from "../../utils";

export const getAllUPTD = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(`${BASE_API_URL}/uptd?${paramsQueryString}`, {
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

export const getUPTD = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/uptd/${id}`, {
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

export const createUPTD = async ({ name, regionalApparatur }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/uptd`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        name,
        regional_apparatus_id: regionalApparatur,
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

export const updateUPTD = async ({ id, name, regionalApparatur }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/uptd/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        name,
        regional_apparatus_id: regionalApparatur,
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

export const deleteUPTD = async (id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/uptd/${id}`, {
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
