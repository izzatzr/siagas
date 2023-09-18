// Icons Sidebar
import dashboardIcon from "../assets/icons/dashboard-icon.svg";
import ratingIndexIcon from "../assets/icons/index-rating-icon.svg";
import databaseInovationIcon from "../assets/icons/database-inovation-icon.svg";
import governmentInovateIcon from "../assets/icons/government-inovate-icon.svg";
import reportIcon from "../assets/icons/report-icon.svg";
import masterDataIcon from "../assets/icons/master-data-icon.svg";
import configurationIcon from "../assets/icons/configuration-icon.svg";
import { getToken, getUser } from "../utils";

export const sidebarDataDummy = [
  {
    label: "Dashboard",
    icon: dashboardIcon,
    active: true,
    roles: ["Super Admin"],
    children: [
      {
        label: "Dashboard SIAGAS",
        link: "/",
        active: false,
      },
      {
        label: "Statistik Inovasi",
        link: "/statistik-inovasi",
        active: false,
      },
      {
        label: "Statistik Indikator Inovasi",
        link: "/statistik-indikator-inovasi",
        active: false,
      },
      {
        label: "Arsip",
        link: "/arsip",
        active: false,
      },
      {
        label: "FAQ",
        link: "/faq",
        active: false,
      },
    ],
  },
  {
    label: "Verifikasi Indeks",
    icon: ratingIndexIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "Review Inovasi Daerah",
        link: "/review-inovasi-daerah",
        active: false,
      },
      {
        label: "Hasil Review",
        link: "/hasil-review",
        active: false,
      },
      {
        label: "Inovasi Yang Ditolak",
        link: "/inovasi-ditolak",
        active: false,
      },
      {
        label: "Ranking Indeks",
        link: "/ranking-indeks",
        active: false,
      },
      {
        label: "Rekap Indeks Akhir",
        link: "/rekap-indeks-akhir",
        active: false,
      },
    ],
  },
  {
    label: "Database Inovasi Daerah",
    icon: databaseInovationIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "Profil Pemda",
        link: "/profil-pemda",
        active: false,
      },
      {
        label: "Inovasi Daerah",
        link: "/inovasi-daerah",
        active: false,
      },
    ],
  },
  {
    label: "Innovative Government Award",
    icon: governmentInovateIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "Peringkat Hasil Review",
        link: "/peringkat-hasil-review",
        active: false,
      },
      {
        label: "Prestasi Dan Hasil Lapangan",
        link: "/prestasi-hasil-lapangan",
        active: false,
      },
      {
        label: "Ranking SIAGAS",
        link: "/ranking-siagas",
        active: false,
      },
    ],
  },
  {
    label: "Laporan",
    icon: reportIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "Indeks Rata-Rata OPD",
        link: "/inovasi-kabupaten",
        active: false,
      },
      // {
      //   label: "Indeks Rata-Rata OPD",
      //   link: "/inovasi-opd",
      //   active: false,
      // },
      // {
      //   label: "Indeks Rata-Rata Distrik",
      //   link: "/inovasi-distrik",
      //   active: false,
      // },
      {
        label: "Rekap Jenis Inovasi",
        link: "/rekap-jenis-inovasi",
        active: false,
      },
      {
        label: "Rekap Bentuk Inovasi",
        link: "/rekap-bentuk-inovasi",
        active: false,
      },
      {
        label: "Rekap Urusan Pemerintah",
        link: "/rekap-urusan-pemerintah",
        active: false,
      },
      {
        label: "Rekap Berdasarkan Inisiator",
        link: "/rekap-berdasarkan-inisiator",
        active: false,
      },
      // {
      //   label: "Rekap Inovasi berdasarkan urusan",
      //   link: "/rekap-inovasi-urusan",
      //   active: false,
      // },
      // {
      //   label: "Rekap Inovasi berdasarkan inisiator",
      //   link: "/rekap-inovasi-inisiator",
      //   active: false,
      // },
    ],
  },
  {
    label: "Master Data",
    icon: masterDataIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "Tim Penilaian",
        link: "/master/tim-penilaian",
        active: false,
      },
      {
        label: "Indikator",
        link: "/master/indikator",
        active: false,
      },
      {
        label: "Urusan Pemerintah",
        link: "/master/urusan-pemerintah",
        active: false,
      },
      {
        label: "OPD dan Daerah",
        link: "/master/opd-daerah",
        active: false,
      },
      {
        label: "Distrik",
        link: "/master/distrik",
        active: false,
      },
      {
        label: "Wilayah",
        link: "/master/wilayah",
        active: false,
      },
      {
        label: "kategori Dokumen",
        link: "/master/kategori-dokumen",
        active: false,
      },
      {
        label: "Dokumen",
        link: "/master/dokumen",
        active: false,
      },
      {
        label: "Pengumuman",
        link: "/master/pengumuman",
        active: false,
      },
      {
        label: "FAQ",
        link: "/master/faq",
        active: false,
      },
      {
        label: "Recount",
        link: "/master/recount",
        active: false,
      },
      {
        label: "Rawlog",
        link: "/master/rawlog",
        active: false,
      },
    ],
  },
  {
    label: "Konfigurasi",
    icon: configurationIcon,
    active: false,
    roles: ["Super Admin"],
    children: [
      {
        label: "User Account",
        link: "/konfigurasi/user-account",
        active: false,
      },
      {
        label: "Daftar OPD",
        link: "/konfigurasi/daftar-opd",
        active: false,
      },
      {
        label: "Daftar UPTD",
        link: "/konfigurasi/daftar-uptd",
        active: false,
      },
      {
        label: "Tuxedo",
        link: "/konfigurasi/tuxedo",
        active: false,
      },
      {
        label: "Setting",
        link: "/konfigurasi/setting",
        active: false,
      },
      // {
      //   label: "Akses API",
      //   link: "/konfigurasi/akses-api",
      //   active: false,
      // },
    ],
  },
  {
    label: "Lomba Inovasi Daerah",
    icon: configurationIcon,
    active: false,
    roles: ["User"],
    children: [
      {
        label: "Inovasi Pemerintah Daerah",
        link: "/lomba/inovasi-pemerintah-daerah",
        active: false,
      },
      {
        label: "Inovasi Masyarakat",
        link: "/lomba/inovasi-masyarakat",
        active: false,
      },
    ],
  },
];

export const navbarDataDummy = [
  {
    label: "Panduan",
    link: "/panduan",
  },
  {
    label: "Laporan Tahunan",
    link: "/laporan-tahunan",
  },
  {
    label: "Dokumen",
    link: "/dokumen",
  },
  {
    label: "Survey Kepuasan Masyarakat",
    link: "/survey",
  },
];

export const announcementData = [
  {
    date: "16 Februari 2023",
    description:
      "Radiogram Perpanjangan Batas Akhir Penginputan Indeks Inovasi Daerah Tahun 2023",
  },
  {
    date: "16 Februari 2023",
    description: "Surat Pengukuran dan Penilaian IID 2022 dan IGA 2022",
  },
  {
    date: "16 Februari 2023",
    description: "Radiogram Penilaian dan Pengukuran IID 2022",
  },
];

export const guideData = [
  {
    date: "1 Januari 2022",
    description: "Manual Book Indeks Inovasi Daerah Tahun 2022",
  },
];

export const documentData = [
  {
    date: "1 Januari 2022",
    description: "PEDOMAN UMUM IID 2022",
  },
];

export const BASE_API_URL = "https://siagas.api.sorong.koneksiku.my.id";

//Contants for useQuery
export const GET_ALL_INNOVATION_STATISTIC = "get_all_innovation_statistic";

export const GET_ALL_GOVERNMENT_BUSINESS = "get_all_government_business";
export const GET_GOVERNMENT_BUSINESS = "get_government_business";

export const GET_ALL_REGIONAL = "get_all_regional";
export const GET_REGIONAL = "get_regional";

export const GET_ALL_INDICATOR = "get_all_indicator";
export const GET_INDICATOR = "get_indicator";
export const SUBMIT_INDICATOR = "submit_indicator";

export const GET_ALL_WILAYAH = "get_all_wilayah";
export const GET_WILAYAH = "get_wilayah";

export const GET_ALL_DOCUEMNT_CATEGORY = "get_all_document_category";
export const GET_DOCUEMNT_CATEGORY = "get_document_category";

export const GET_ALL_DOCUEMNT = "get_all_document";
export const GET_DOCUEMNT = "get_document";

export const GET_ALL_ANNOUNCEMENT = "get_all_announcement";
export const GET_ANNOUNCEMENT = "get_announcement";

export const GET_ALL_FAQ = "get_all_faq";
export const GET_FAQ = "get_faq";

export const GET_ALL_PEMDA_PROFILE = "get_all_pemda_profile";
export const GET_PEMDA_PROFILE = "get_pemda_profile";

export const GET_ALL_USER_ACCOUNT = "get_all_user_account";
export const GET_USER_ACCOUNT = "get_user_account";

export const GET_ALL_OPD = "get_all_opd";
export const GET_OPD = "get_opd";

export const GET_ALL_UPDT = "get_all_updt";
export const GET_UPDT = "get_updt";

export const GET_ALL_TUXEDO = "get_all_tuxedo";
export const GET_TUXEDO = "get_tuxedo";

export const GET_ALL_SETTING = "get_all_setting";
export const GET_SETTING = "get_setting";

export const GET_ALL_ARCHIVE = "get_all_archive";

export const GET_INDICATOR_STATISTIC = "get_indicator_statistic";

export const GET_FINAL_INDEX = "get_final_index";

export const GET_ALL_REGIONAL_INNOVATION_REVIEW =
  "get_all_regional_innovation_review";
export const GET_ALL_REGIONAL_INNOVATION_REVIEW_BY_ID =
  "get_all_regional_innovation_review_by_id";
export const GET_REGIONAL_INNOVATION_REVIEW_BY_INNOVATION_PROFILE =
  "get_regional_innovation_review_by_innovation_profile";
export const GET_REGIONAL_INNOVATION_REVIEW_BY_INDICATOR =
  "get_regional_innovation_review_by_indicator";
export const GET_REGIONAL_INNOVATION_REVIEW_EVALUATION =
  "get_regional_innovation_review_evaluation";

export const GET_ALL_REVIEW_RESULT = "get_all_review_result";

export const GET_ALL_REJECTED_INNOVATION = "get_all_rejected_innovation";

export const GET_ALL_INDEX_RANKING = "get_all_index_ranking";

export const GET_ALL_REGENCY_INNOVATE = "get_all_regency_innovate";
export const GET_ALL_INNOVATION_TYPE = "get_all_innovation_type";
export const GET_ALL_INNOVATION_FORM = "get_all_innovation_form";
export const GET_ALL_GOVERNMENT_AFFAIRS = "get_all_government_affairs";
export const GET_ALL_INNOVATION_INITIATOR = "get_all_innovation_initiator";

export const GET_ALL_REVIEW_RANKING = "get_all_review_ranking";
export const GET_ALL_ACHIEVMENT_RESULT = "get_all_achievment_result";
export const GET_ALL_SIAGAS_RANKING = "get_all_siagas_ranking";

export const GET_ALL_REGIONAL_GOVERNMENT_INNOVATION =
  "get_all_regional_government_innovation";
