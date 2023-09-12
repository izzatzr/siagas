import TableAction from "../components/TableAction";
import { EDIT_ACTION_TABLE } from "../constants";

export const jsonHeaderPemdaProfile = [
  {
    key: "nama_daerah",
    title: "Nama Pemda",
  },
  {
    key: "",
    title: "Input Indikator Spd",
    render: (item) => {
      return (
        <div style={{ marginLeft: 10 }}>
          <TableAction
            data={[
              {
                code: EDIT_ACTION_TABLE,
                onClick: () => {
                  console.log(EDIT_ACTION_TABLE);
                },
              },
            ]}
          />
        </div>
      );
    },
  },
  {
    key: "action",
    title: "Aksi",
  },
];

export const jsonHeaderRegionalInnovation = [
  {
    key: "pemda_name",
    title: "Nama Pemda",
  },
  {
    key: "innovation_name",
    title: "Nama Inovasi",
  },
  {
    key: "innovation_level",
    title: "Tahapan Inovasi",
  },
  {
    key: "gov_business",
    title: "Urusan Pemerintahan",
  },
  {
    key: "date_testing",
    title: "Waktu Uji Coba Inovasi",
  },
  {
    key: "date",
    title: "Waktu Penerapan",
  },
  {
    key: "score_estimate",
    title: "Estimasi Skor Kematangan",
  },
  {
    key: "action",
    title: "Aksi",
  },
];

export const jsonRowRegionalInnovation = [
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
  {
    pemda_name: "Provinsi Jawa Timur",
    innovation_name: "SIMPAK Online",
    innovation_level: "Penerapan",
    gov_business: "sosial",
    date_testing: "2020-01-10",
    date: "2020-01-10",
    score_estimate: "90.0",
  },
];
