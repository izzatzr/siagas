import { BASE_API_URL } from "../../../constans/constans";
import { convertQueryString, getToken } from "../../../utils";

export const getAllInnovationType = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/laporan/jenis_inovasi?${paramsQueryString}`,
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
