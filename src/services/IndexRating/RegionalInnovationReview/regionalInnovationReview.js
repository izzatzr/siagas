import { BASE_API_URL } from "../../../constans/constans";
import { convertQueryString, getToken } from "../../../utils";

export const getAllRegionalInnovationReview = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/review_inovasi_daerah?${paramsQueryString}`,
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

export const getRegionalInnovationReviewById = (id) => async () => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/review_inovasi_daerah/${id}`,
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

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const getRegionalInnovationReviewByInnovationProfile =
  (id) => async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/review_inovasi_daerah/${id}/profil_inovasi`,
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

      return null;
    } catch (error) {
      console.log(error);
    }
  };

export const getRegionalInnovationReviewEvaluation =
  (id, indicatorId) => async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/review_inovasi_daerah/${id}/indikator/${indicatorId}/evaluasi`,
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

      return null;
    } catch (error) {
      console.log(error);
    }
  };

export const getRegionalInnovationReviewByIndicator = (id) => async () => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/review_inovasi_daerah/${id}/indikator`,
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

    return null;
  } catch (error) {
    console.log(error);
  }
};

export const updateRegionalInnovationReview = async ({ id, status, skor }) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/review_inovasi_daerah/${id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getToken().token}`,
        },
        body: JSON.stringify({
          status: status,
          skor: skor,
          inovasi_id: id,
        }),
        method: "PATCH",
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
