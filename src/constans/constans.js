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
    roles: ["Super Admin", "User", "Admin", "Pemda"],
    children: [
      {
        label: "Dashboard SIAGAS",
        link: "/",
        active: false,
        roles: ["Super Admin", "User", "Admin", "Pemda"],
      },
      {
        label: "Statistik Inovasi",
        link: "/statistik-inovasi",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Statistik Indikator Inovasi",
        link: "/statistik-indikator-inovasi",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Arsip",
        link: "/arsip",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "FAQ",
        link: "/faq",
        active: false,
        roles: ["Super Admin", "User"],
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
        roles: ["Super Admin"],
      },
      {
        label: "Hasil Review",
        link: "/hasil-review",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Inovasi Yang Ditolak",
        link: "/inovasi-ditolak",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Ranking Indeks",
        link: "/ranking-indeks",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Rekap Indeks Akhir",
        link: "/rekap-indeks-akhir",
        active: false,
        roles: ["Super Admin"],
      },
    ],
  },
  {
    label: "Database Inovasi Daerah",
    icon: databaseInovationIcon,
    active: false,
    roles: ["Super Admin", "User", "Admin", "Pemda"],
    children: [
      {
        label: "Profil OPD",
        link: "/profil-pemda",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "Inovasi Daerah",
        link: "/inovasi-daerah",
        active: false,
        roles: ["Super Admin", "User"],
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
        roles: ["Super Admin"],
      },
      {
        label: "Prestasi Dan Hasil Lapangan",
        link: "/prestasi-hasil-lapangan",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Ranking SIAGAS",
        link: "/ranking-siagas",
        active: false,
        roles: ["Super Admin"],
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
        roles: ["Super Admin"],
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
        roles: ["Super Admin"],
      },
      {
        label: "Rekap Bentuk Inovasi",
        link: "/rekap-bentuk-inovasi",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Rekap Urusan Pemerintah",
        link: "/rekap-urusan-pemerintah",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Rekap Berdasarkan Inisiator",
        link: "/rekap-berdasarkan-inisiator",
        active: false,
        roles: ["Super Admin"],
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
        roles: ["Super Admin"],
      },
      {
        label: "Indikator",
        link: "/master/indikator",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Urusan Pemerintah",
        link: "/master/urusan-pemerintah",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Kategori Dokumen",
        link: "/master/kategori-dokumen",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Dokumen",
        link: "/master/dokumen",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Pengumuman",
        link: "/master/pengumuman",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "FAQ",
        link: "/master/faq",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Rawlog",
        link: "/master/rawlog",
        active: false,
        roles: ["Super Admin"],
      },
    ],
  },
  {
    label: "Lomba Inovasi Daerah",
    icon: configurationIcon,
    active: false,
    roles: ["User", "Admin", "Pemda"],
    children: [
      {
        label: "Inovasi Pemerintah Daerah",
        link: "/lomba/inovasi-pemerintah-daerah",
        active: false,
        roles: ["User", "Admin", "Pemda"],
      },
      {
        label: "Inovasi Masyarakat",
        link: "/lomba/inovasi-masyarakat",
        active: false,
        roles: ["User", "Admin", "Pemda"],
      },
    ],
  },
  {
    label: "Konfigurasi",
    icon: configurationIcon,
    active: false,
    roles: ["Super Admin", "User"],
    children: [
      {
        label: "User Account",
        link: "/konfigurasi/user-account",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "Daftar OPD",
        link: "/konfigurasi/daftar-opd",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "Daftar Unit Sekolah/Puskesmas",
        link: "/konfigurasi/daftar-uptd",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "Distrik",
        link: "/konfigurasi/distrik",
        active: false,
        roles: ["Super Admin"],
      },
      {
        label: "Tuxedo",
        link: "/konfigurasi/tuxedo",
        active: false,
        roles: ["Super Admin", "User"],
      },
      {
        label: "Setting",
        link: "/konfigurasi/setting",
        active: false,
        roles: ["Super Admin", "User"],
      },
      // {
      //   label: "Akses API",
      //   link: "/konfigurasi/akses-api",
      //   active: false,
      // },
    ],
  },
];

export const navbarDataDummy = [
  {
    label: "Pengumuman",
    link: "/pengumuman",
  },
  {
    label: "Manual Book",
    link: "/manual-book",
  },
  {
    label: "Petunjuk Teknis",
    link: "/petunjuk-teknis",
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

export const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
  keyboard: {
    bindings: {
      tab: false,
    },
  },
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const typeList = [
  {
    value: "spd",
    label: "Satuan Pemerintah Daerah",
  },
  {
    value: "si",
    label: "Satuan Inovasi",
  },
  {
    value: "iv",
    label: "Indikator Validasi",
  },
  {
    value: "ipkd",
    label: "Indikator Presentasi Kepala Daerah",
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

export const GET_ALL_RAWLOG_QUERY_KEY = "get_all_rawlog";

export const GET_ALL_PEMDA_PROFILE = "get_all_pemda_profile";
export const GET_PEMDA_PROFILE = "get_pemda_profile";

export const GET_ALL_DOCUMENT_PEMDA_PROFILE = "get_all_document_pemda_profile";
export const GET_ALL_INDICATOR_PEMDA_PROFILES =
  "get_all_indicator_pemda_profiles";
export const UPLOAD_INDICATOR_DOCUMENT_PEMDA_PROFILE =
  "upload_indicator_document_pemda_profile";

export const DELETE_INDICATOR_DOCUMENT_PEMDA_PROFILE =
  "delete_indicator_document_pemda_profile";

export const GET_ALL_USER_ACCOUNT = "get_all_user_account";
export const GET_USER_ACCOUNT = "get_user_account";

export const GET_ALL_OPD = "get_all_opd";
export const GET_OPD = "get_opd";

export const GET_ALL_UPDT = "get_all_updt";
export const GET_UPDT = "get_updt";

export const GET_ALL_TUXEDO = "get_all_tuxedo";
export const GET_TUXEDO = "get_tuxedo";

export const GET_ALL_SETTING = "get_all_setting";

export const CHECK_USER = "check_user";

export const GET_ALL_REGIONAL_INNOVATION_QUERY_KEY =
  "get_all_regional_innovation";
export const GET_REGIONAL_INNOVATION_QUERY_KEY = "get_regional_innovation";
export const GET_INDICATOR_REGIONAL_INNOVATION_QUERY_KEY =
  "get_indicator_regional_innovation";

export const GET_ALL_DOCUMENT_REGIONAL_INNOVATION_QUERY_KEY =
  "get_all_document_regional_innovation";
export const GET_DOWNLOAD_EXCEL_REGIONAL_INNOVATION_QUERY_KEY =
  "get_download_excel_regional_innovation";

export const GET_ALL_ASSESSMENT_TEAM_QUERY_KEY = "get_all_assessment_team";
export const GET_SETTING = "get_setting";

export const GET_ALL_ARCHIVE = "get_all_archive";
export const GET_INDICATOR_STATISTIC = "get_indicator_statistic";
export const GET_FINAL_INDEX = "get_final_index";
export const GET_OPD_STATISTIC = "get_opd_statistic";

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


export const GET_ALL_DISTRICT_QUERY_KEY = 'get_all_district'
export const GET_DISTRICT_QUERY_KEY = 'get_district'