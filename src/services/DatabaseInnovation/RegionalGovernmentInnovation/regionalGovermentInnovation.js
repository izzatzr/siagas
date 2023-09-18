import { BASE_API_URL } from "../../../constans/constans";
import { convertQueryString, getToken } from "../../../utils";

export const getAllRegionalGovernmentInnovation = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah?${paramsQueryString}`,
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

export const deleteRegionalGovernmentInnovation = async (id) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/${id}`,
      {
        headers: {
          "Content-type": "application/json",
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
