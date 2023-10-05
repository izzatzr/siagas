import { BASE_API_URL } from "../../../constans/constans";
import { convertQueryString, getToken } from "../../../utils";

export const getAllRegencyInnovate = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/laporan/indeks?${paramsQueryString}`,
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
    throw error;
  }
};
