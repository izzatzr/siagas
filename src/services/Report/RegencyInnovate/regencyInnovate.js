import { BASE_API_URL } from "../../../constans/constans";
import { processResult, throwErrorUtil } from "../../../helpers/fetchingUtils";
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

export const getDownloadXLS = async (payload) => {
  const { type, ...params } = payload;

  const paramsQueryString = convertQueryString(params);

  const url = `${BASE_API_URL}/laporan/indeks/download/${type}?${paramsQueryString}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });

    const result = await processResult(response, { downloadMode: true });

    return result;
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};
