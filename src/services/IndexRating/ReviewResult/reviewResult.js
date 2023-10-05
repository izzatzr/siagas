import { BASE_API_URL } from "../../../constans/constans";
import { convertQueryString, getToken } from "../../../utils";

export const getAllReviewResult = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/hasil_review_inovasi_daerah?${paramsQueryString}`,
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

export const deleteReviewResult = async ({ id }) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/hasil_review_inovasi_daerah/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
        method: "DELETE",
      }
    );

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
