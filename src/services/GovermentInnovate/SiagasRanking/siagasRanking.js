import { BASE_API_URL } from "../../../constans/constans";
import { processResult, throwErrorUtil } from "../../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../../utils";

export const getAllSiagasRanking = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/innovative_government_award/rangking?${paramsQueryString}`,
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


export const getDownloadSiagasRanking = async (payload) => {
  const { type, ...params } = payload;

  const paramsQueryString = convertQueryString(params);

  const url = `${BASE_API_URL}/innovative_government_award/rangking/download/${type}?${paramsQueryString}`;

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