import { convertQueryString, getToken } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";

export const getAllRawlog = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/rawlog?${paramsQueryString}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    if (response.status === 200) {
      const result = await processResult(response);

      const isSuccess = result.code === 200;

      if (isSuccess) {
        return result;
      }
    }

    throw Error("Terjadi kesalahan");
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};
