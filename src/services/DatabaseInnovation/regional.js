import { BASE_API_URL } from '../../constans/constans';
import { processResult, throwErrorUtil } from '../../helpers/fetchingUtils';
import { convertQueryString, getToken } from '../../utils';

export const getAllRegionalInnovation = (params) => async () => {
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

export const getRegionalInnovation = (id) => async () => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/${id}`,
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
  } catch (error) {}
};

export const getIndicatorRegionalInnovation = (id) => async () => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/${id}/indikator`,
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
  } catch (error) {}
};

export const createRegionalInnovation = async (payload) => {
  try {
    const { id, ...body } = payload;
    const url = `${BASE_API_URL}/inovasi_pemerintah_daerah${
      id ? '/' + id : ''
    }`;

    console.log(payload);

    const formData = new FormData();
    formData.append('nama_pemda', payload.nama_pemda);
    formData.append('nama_inovasi', payload.nama_inovasi);
    formData.append('tahapan_inovasi', payload.tahapan_inovasi);
    formData.append('inisiator_inovasi', payload.inisiator_inovasi);
    formData.append('jenis_inovasi', payload.jenis_inovasi);
    formData.append('bentuk_inovasi', payload.bentuk_inovasi);
    formData.append('tematik', payload.tematik);
    formData.append('waktu_uji_coba', payload.waktu_uji_coba);
    formData.append('waktu_penerapan', payload.waktu_penerapan);
    formData.append('rancang_bangun', payload.rancang_bangun);
    formData.append('tujuan', payload.tujuan);
    formData.append('manfaat', payload.manfaat);
    formData.append('hasil_inovasi', payload.hasil_inovasi);
    formData.append('urusan_pemerintah', payload.urusan_pemerintah);
    formData.append('anggaran_file', payload.anggaran_file);
    formData.append('profile_file', payload.profile_file);
    formData.append('foto', payload.foto);
    formData.append('daftar_foto', JSON.stringify(payload.daftar_foto));

    const response = await fetch(url, {
      method: payload?.id ? 'PATCH' : 'POST',
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
    throw Error('Submit inovasi daerah error');
  }
};

export const editRegionalInnovationScore = async (payload) => {
  try {
    const { id, ...body } = payload;
    const url = `${BASE_API_URL}/inovasi_pemerintah_daerah/skor_kematangan/${id}`;

    const response = await fetch(url, {
      method: payload?.id ? 'PATCH' : 'POST',
      headers: {
        Authorization: `Bearer ${getToken().token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skor_kematangan: parseFloat(payload.skor_kematangan),
      }),
    });

    const result = await response.json();
    const isSuccess = result.code === 200;

    if (isSuccess) {
      return result;
    }

    throw Error(result.message);
  } catch (error) {
    throw Error('Submit inovasi daerah error');
  }
};

export const getAllDocumentRegionalInnovation = (params) => async () => {
  const { indicator_id, inovasi_id, ...rest } = params;
  try {
    const paramsQueryString = convertQueryString(rest);
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/indikator/${inovasi_id}/${indicator_id}/files?${paramsQueryString}`,
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

export const uploadDocumentRegionalInnovation = async (payload) => {
  try {
    const formData = new FormData();
    formData.append('nomor_surat', payload.nomor_dokumen);
    formData.append('tanggal_surat', payload.tanggal_dokumen);
    formData.append('tentang', payload.tentang);
    formData.append('dokumen', payload.dokumen);

    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/indikator/${payload?.inovasi_id}/${payload.indikator_id}/upload`,
      {
        method: 'POST',
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
    throw Error('Upload dokumen pendukung error');
  }
};

export const getDownlaodFileRegionalInnovation = async (payload) => {
  const { id, type } = payload;
  try {
    const response = await fetch(
      `${BASE_API_URL}/inovasi_pemerintah_daerah/${id}/download/${type}`,
      {
        headers: {
          Authorization: `Bearer ${getToken().token}`,
        },
      }
    );

    const result = await processResult(response, { downloadMode: true });

    return result;
  } catch (error) {
    throwErrorUtil(error, `${error?.message || error}`);
  }
};
