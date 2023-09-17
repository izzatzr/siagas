import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../utils";

export const getAllAssessmentTeam = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/tim_penilaian?${paramsQueryString}`,
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

export const submitAssessmentTeam = async (payload) => {
  try {
    const url = `${BASE_API_URL}/tim_penilaian${
      payload?.id ? "/" + payload?.id : ""
    }`;

    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify(payload),
    });

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
