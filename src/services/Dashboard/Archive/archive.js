import { convertQueryString, getToken } from "../../../utils";
import { BASE_API_URL } from "../../../constans/constans";
import { processResult, throwErrorUtil } from "../../../helpers/fetchingUtils";

export const getAllArchive = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/dashboard/arsip?${paramsQueryString}`,
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

export const getDownloadArchiveDashboard = async (payload) => {
  const { type, ...params } = payload;

  const paramsQueryString = convertQueryString(params);

  const url = `${BASE_API_URL}/dashboard/arsip/download/${type}?${paramsQueryString}`;

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
