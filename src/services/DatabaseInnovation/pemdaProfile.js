import { BASE_API_URL } from "../../constans/constans";
import { processResult, throwErrorUtil } from "../../helpers/fetchingUtils";
import { convertQueryString, getToken } from "../../utils";

export const getAllPemdaProfiles = (params) => async () => {
  try {
    const paramsQueryString = convertQueryString(params);
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda?${paramsQueryString}`,
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

export const getPemdaProfiles = (id) => async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/profil_pemda/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken().token}`,
      },
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

export const submitPemdaProfil = async (payload) => {
  try {
    const url = `${BASE_API_URL}/profil_pemda${
      payload?.id ? "/" + payload?.id : ""
    }`;

    const formData = new FormData();
    formData.append("nama_pemda", payload.nama_pemda);
    formData.append("nama_daerah", payload.nama_daerah);
    formData.append("opd_yang_menangani", payload.opd_yang_menangani);
    formData.append("alamat_pemda", payload.alamat_pemda);
    formData.append("email", payload.email);
    formData.append("no_telpon", payload.no_telpon);
    formData.append("nama_admin", payload.nama_admin);
    formData.append("file", payload.file);

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
    throw Error("Submit pemda profil error");
  }
};

export const getAllDocumentPemdaProfile = (params) => async () => {
  const { id, ...rest } = params;
  try {
    const paramsQueryString = convertQueryString(rest);
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda/indikator/${id}/files?${paramsQueryString}`,
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

export const uploadDocumentPemdaProfile = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("nomor_dokumen", payload.nomor_dokumen);
    formData.append("tanggal_dokumen", payload.tanggal_dokumen);
    formData.append("tentang", payload.tentang);
    formData.append("dokumen", payload.dokumen);

    const response = await fetch(
      `${BASE_API_URL}/profil_pemda/indikator/${payload.pemda_indikator_id}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error(result.message);
  } catch (error) {
    throw Error("Upload dokumen pendukung error");
  }
};

export const deleteDocumentPemdaProfile = async ({
  pemda_indikator_id,
  file_id,
}) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda/indikator/${pemda_indikator_id}/delete/${file_id}`,
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

export const getAllIndicatorPemdaProfile = (params) => async () => {
  try {
    const { pemda_indikator_id, ...rest } = params;
    const paramsQueryString = convertQueryString(rest);
    const response = await fetch(
      `${BASE_API_URL}/profil_pemda/${pemda_indikator_id}/indikator?${paramsQueryString}`,
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
