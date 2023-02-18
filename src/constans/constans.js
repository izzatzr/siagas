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
    active : true,
    children: [
      {
        label: "Dashboard SIAGAS",
      },
      {
        label: "Statistik Inovasi",
      },
      {
        label: "Statistik Indikator Inovasi",
      },
      {
        label: "Arsip",
      },
      {
        label: "FAQ",
      },
    ],
  },
  {
    label: "Penilaian Indeks",
    icon: ratingIndexIcon,
    active : false,
    children: [
      {
        label: "Review Inovasi Daerah",
      },
      {
        label: "Hasil Review",
      },
      {
        label: "Inovasi Yang Ditolak",
      },
      {
        label: "Quality Control",
      },
      {
        label: "Ranking Indeks",
      },
      {
        label: "Rekap Indeks Akhir",
      },
    ],
  },
  {
    label: "Database Inovasi Daerah",
    icon: databaseInovationIcon,
    active : false,
    children: [
      {
        label: "Profil Pemda",
      },
      {
        label: "Inovasi Daerah",
      },
    ],
  },
  {
    label: "Innovative Government Award",
    icon: governmentInovateIcon,
    active : false,
    children: [
      {
        label: "Peringkat Hasil Review",
      },
      {
        label: "Prestasi Dan Hasil Lapangan",
      },
      {
        label: "Ranking SIAGAS",
      },
    ],
  },
  {
    label: "Laporan",
    icon: reportIcon,
    active : false,
    children: [
      {
        label: "Analisis Rata-Rata",
      },
      {
        label: "Indeks Rata-Rata Inovasi Nasional",
      },
      {
        label: "Indeks Rata-Rata Inovasi Wilayah",
      },
      {
        label: "Indeks Rata-Rata Inovasi Provinsi",
      },
      {
        label: "Indeks Rata-Rata Inovasi Kota",
      },
      {
        label: "Indeks Rata-Rata Inovasi Kabupaten",
      },
      {
        label: "Indeks Rata-Rata Inovasi Daerah Perbatasan",
      },
      {
        label: "Indeks Rata-Rata Inovasi Daerah Tertinggal",
      },
      {
        label: "Indeks Rata-Rata Inovasi Papua - Papua Barat",
      },
      {
        label: "Rekap Jenis Inovasi",
      },
      {
        label: "Rekap Bentuk Inovasi",
      },
      {
        label: "Rekap Urusan Pemerintah",
      },
      {
        label: "Rekap Urusan Pemerintah",
      },
      {
        label: "Rekap Berdasarkan Inisiator",
      },
    ],
  },
  {
    label: "Master Data",
    icon: masterDataIcon,
    active : false,
    children: [
      {
        label: "Belum ada",
      },
    ],
  },
  {
    label: "Konfigurasi",
    icon: configurationIcon,
    active : false,
    children: [
      {
        label: "Belum ada",
      },
    ],
  },
];
