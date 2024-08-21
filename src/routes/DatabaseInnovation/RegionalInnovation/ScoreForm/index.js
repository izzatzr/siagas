import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUtilContexts } from '../../../../context/Utils';
import { convertQueryString } from '../../../../utils';
import {
  BASE_API_URL,
  GET_REGIONAL_INNOVATION_QUERY_KEY,
} from '../../../../constans/constans';
import { useMutation, useQuery } from 'react-query';
import {
  editRegionalInnovationScore,
  getRegionalInnovation,
} from '../../../../services/DatabaseInnovation/regional';
import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import { MdCheckCircle } from 'react-icons/md';

const initialPayload = {
  nama_pemda: null,
  nama_inovasi: '',
  tahapan_inovasi: '',
  inisiator_inovasi: '',
  jenis_inovasi: '',
  bentuk_inovasi: null,
  tematik: null,
  waktu_uji_coba: '',
  waktu_penerapan: '',
  rancang_bangun: '',
  tujuan: '',
  manfaat: '',
  hasil_inovasi: '',
  urusan_pemerintah: null,
  anggaran_file: null,
  profile_file: null,
  daftar_foto: null,
  skor_kematangan: null,
};

const RegionalInnovationScoreForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { setLoadingUtil, snackbar } = useUtilContexts();
  const currentId = params.id;

  const [payload, setPayload] = useState(initialPayload);

  useQuery(
    [GET_REGIONAL_INNOVATION_QUERY_KEY],
    getRegionalInnovation(currentId),
    {
      enabled: !!currentId,
      onSuccess: async (res) => {
        const { data, code } = res;
        if (code === 200) {
          setPayload({
            skor_kematangan: data?.skor_kematangan,
          });
        }
      },
    }
  );

  const submitRegionalInnovationMutation = useMutation(
    editRegionalInnovationScore
  );

  const onHandleChange = (key, value) => {
    setPayload((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onHandleSubmit = () => {
    setLoadingUtil(true);

    submitRegionalInnovationMutation.mutate(
      {
        id: currentId,
        ...payload,
      },
      {
        onSuccess: (res) => {
          if (res.code === 200) {
            setLoadingUtil(false);
            snackbar(
              currentId ? 'Berhasil diubah' : 'Berhasil disimpan',
              () => {
                navigate('/inovasi-daerah');
              }
            );
          }
        },
        onError: () => {
          setLoadingUtil(false);
          snackbar('Terjadi kesalahan', () => {}, 'error');
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full gap-6 py-6">
      <div className="text-[#333333] text-2xl font-bold">Inovasi Daerah</div>
      <div className="flex flex-col w-full gap-6 p-8 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <Link to="/inovasi-daerah">
            <BiArrowBack />
          </Link>
          <span className="text-lg font-medium">Edit Skor Kematangan</span>
        </div>
        <TextInput
          type="number"
          label={'Skor Kematangan'}
          placeholder="Tulis disini"
          onChange={(e) => onHandleChange('skor_kematangan', e.target.value)}
          value={payload.skor_kematangan}
        />

        <div className="flex items-center gap-4 w-60">
          <div className="flex-1">
            <Button
              onClick={onHandleSubmit}
              padding="px-3 py-2"
              text="Simpan"
              icon={<MdCheckCircle />}
            />
          </div>
          <div className="flex-1">
            <Button
              onClick={() => {
                navigate('/inovasi-daerah');
              }}
              padding="px-3 py-2"
              text="Batal"
              background="#EAEAEA"
              fontColor="#333333"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalInnovationScoreForm;
