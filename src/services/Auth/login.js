import { BASE_API_URL } from "../../constans/constans";
import { getToken } from "../../utils";

export const doLogin = async (payload) => {
  try {
    const response = await fetch(`${BASE_API_URL}/authentication/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result.data;
    }
    throw Error("Username atau password salah");
  } catch (error) {
    throw Error("Terjadi kesalahan");
  }
};

export const checkUser = () => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/authentication/me`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
    });
    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result.data;
    }
    throw Error("Terjadi kesalahan");
  } catch (error) {
    throw Error("Terjadi kesalahan");
  }
};
