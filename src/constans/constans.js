// Icons Sidebar
import dashboardIcon from "../assets/icons/dashboard-icon.svg";
import ratingIndexIcon from "../assets/icons/index-rating-icon.svg";
import databaseInovationIcon from "../assets/icons/database-inovation-icon.svg";
import governmentInovateIcon from "../assets/icons/government-inovate-icon.svg";
import reportIcon from "../assets/icons/report-icon.svg";
import masterDataIcon from "../assets/icons/master-data-icon.svg";
import configurationIcon from "../assets/icons/configuration-icon.svg";

export const sidebarDataDummy = [
  {
    label: "Dashboard",
    icon: dashboardIcon,
    active: true,
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
    label: "Penilaian Indeks",
    icon: ratingIndexIcon,
    active: false,
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
        label: "Quality Control",
        link: "/quality-control",
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
    children: [
      {
        label: "Analisis Rata-Rata",
        link: "/analisis-rata",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Nasional",
        link: "/inovasi-nasional",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Wilayah",
        link: "/inovasi-wilayah",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Provinsi",
        link: "/inovasi-provinsi",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Kota",
        link: "/inovasi-kota",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Kabupaten",
        link: "/inovasi-kabupaten",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Daerah Perbatasan",
        link: "/inovasi-perbatasan",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Daerah Tertinggal",
        link: "/inovasi-tertinggal",
        active: false,
      },
      {
        label: "Indeks Rata-Rata Inovasi Papua - Papua Barat",
        link: "/inovasi-papua",
        active: false,
      },
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
        label: "Rekap Urusan Pemerintah",
        link: "/rekap-urusan-pemerintah",
        active: false,
      },
      {
        label: "Rekap Berdasarkan Inisiator",
        link: "/rekap-inisiator",
        active: false,
      },
    ],
  },
  {
    label: "Master Data",
    icon: masterDataIcon,
    active: false,
    children: [
      {
        label: "Belum ada",
      },
    ],
  },
  {
    label: "Konfigurasi",
    icon: configurationIcon,
    active: false,
    children: [
      {
        label: "Belum ada",
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
    description:
      "Manual Book Indeks Inovasi Daerah Tahun 2022",
  },
];

export const documentData = [
  {
    date: "1 Januari 2022",
    description:
      "PEDOMAN UMUM IID 2022",
  },
];
