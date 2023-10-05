import { BASE_API_URL } from "../../constans/constans";
import { convertQueryString, getToken } from "../../utils";

export const getAllTuxedo = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/tuxedo?${paramsQueryString}`,
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

export const getTuxedo = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/tuxedo/${id}`, {
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

export const createTuxedo = async ({ content, section, slug, title }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/tuxedo`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        content,
        section,
        slug,
        title,
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

export const updateTuxedo = async ({ id, content, section, slug, title }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/tuxedo/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        content,
        section,
        slug,
        title,
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

export const deleteTuxedo = async (id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/tuxedo/${id}`, {
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
