import { convertQueryString, getToken } from "../../utils";
import { BASE_API_URL } from "../../constans/constans";

export const getAllAnnouncement = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/pengumuman?${paramsQueryString}`,
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

export const findAnnouncement = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/pengumuman/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
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
};

export const submitAnnouncement = async (payload) => {
  try {
    const url = `${BASE_API_URL}/pengumuman${
      payload?.id ? "/" + payload?.id : ""
    }`;

    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("slug", payload.slug);
    formData.append("content", payload.content);
    formData.append("document", payload.document);

    const response = await fetch(url, {
      method: payload?.id ? "PATCH" : "POST",
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
      body: formData,
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error(result.message);
  } catch (error) {
    throw Error("Submit pengumuman error");
  }
};

export const deleteAnnouncemet = async ({id}) => {
  try {
    const response = await fetch(`${BASE_API_URL}/pengumuman/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
      method: "DELETE",
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
