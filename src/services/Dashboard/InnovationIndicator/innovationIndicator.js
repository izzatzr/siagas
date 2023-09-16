import {convertQueryString, getToken} from "../../../utils";
import {BASE_API_URL} from "../../../constans/constans";

export const getIndicatorStatistic = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(`${BASE_API_URL}/dashboard/statistik_indikator?${paramsQueryString}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      }
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
}