import { convertQueryString, getToken } from "../../../utils";
import { BASE_API_URL } from "../../../constans/constans";

export const getAllRejectedInnovation = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/inovasi_ditolak?${paramsQueryString}`,
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

export const updateRejectedInnovation = async (id) => {
  try {
    const response = await fetch(`${BASE_API_URL}/inovasi_ditolak/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
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
