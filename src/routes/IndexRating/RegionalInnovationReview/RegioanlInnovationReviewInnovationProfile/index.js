import { useParams } from "react-router-dom";
import { useUtilContexts } from "../../../../context/Utils";
import { useQuery } from "react-query";
import { GET_REGIONAL_INNOVATION_REVIEW_BY_INNOVATION_PROFILE } from "../../../../constans/constans";
import { getRegionalInnovationReviewByInnovationProfile } from "../../../../services/IndexRating/RegionalInnovationReview/regionalInnovationReview";
import React from "react";

const RegionalInnovationReviewInnovationProfile = () => {
  const params = useParams();
  const currentId = params.id;

  const { snackbar, setLoadingUtil } = useUtilContexts();

  const { isLoading, data } = useQuery(
    [GET_REGIONAL_INNOVATION_REVIEW_BY_INNOVATION_PROFILE],
    getRegionalInnovationReviewByInnovationProfile(currentId)
  );

  React.useEffect(() => {
    if (isLoading) {
      setLoadingUtil(true);
    } else {
      setLoadingUtil(false);
    }
  }, [isLoading]);

  if (!isLoading) {
    return (
      <div className="mt-6 space-y-6">
        <div>
          <h1 className="font-semibold">Nama Pemda</h1>
          <h2 className="text-sm">{data.data.nama_pemda}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Nama Inovasi</h1>
          <h2 className="text-sm">{data.data.nama_inovasi}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Inisiator Daerah</h1>
          <h2 className="text-sm">{data.data.inisiator_daerah}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Jenis Inovasi</h1>
          <h2 className="text-sm">{data.data.jenis_inovasi}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Bentuk Inovasi Daerah</h1>
          <h2 className="text-sm">{data.data.bentuk_inovasi_daerah}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Tematik</h1>
          <h2 className="text-sm">{data.data.tematik}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Detail Tematik</h1>
          <h2 className="text-sm">{data.data.detail_tematik}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Urusan Pemerintahan Utama</h1>
          <h2 className="text-sm">{data.data.urusan_pemerintah}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Tingakatan</h1>
          <h2 className="text-sm">{data.data.tingkatan}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Waktu Uji Coba</h1>
          <h2 className="text-sm">{data.data.waktu_uji_coba}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Waktu Penerapan Inovasi Daerah</h1>
          <h2 className="text-sm">{data.data.waktu_penerapan}</h2>
        </div>

        <div>
          <h1 className="font-semibold">OPD yang menangani</h1>
          <h2 className="text-sm">{data.data.opd}</h2>
        </div>

        <div>
          <h1 className="font-semibold">E-Mail</h1>
          <h2 className="text-sm">{data.data.pemda.email}</h2>
        </div>

        <div>
          <h1 className="font-semibold">No. Telp</h1>
          <h2 className="text-sm">{data.data.pemda.no_telp}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Nama Admin</h1>
          <h2 className="text-sm">{data.data.pemda.nama_admin}</h2>
        </div>

        <div>
          <h1 className="font-semibold">Dokumen Penelitian</h1>
          <h2 className="text-sm">
            Judul Penelitian{" "}
            <span className="ml-3 text-blue-400 underline cursor-pointer">
              Download
            </span>
          </h2>
        </div>
      </div>
    );
  }
};

export default RegionalInnovationReviewInnovationProfile;
