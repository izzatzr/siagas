import { convertQueryString, getToken } from "../../../utils";
import { BASE_API_URL } from "../../../constans/constans";

export const getAllFinalIndex = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/rekap_indeks_akhir?${paramsQueryString}`,
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

export const updateFinalIndex = async ({ id, nominator }) => {
  try {
    const response = await fetch(`${BASE_API_URL}/rekap_indeks_akhir/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getToken().token}`,
      },
      body: JSON.stringify({
        nominator,
      }),
      method: "PATCH",
    });

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
