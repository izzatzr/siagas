import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../components/Layout/Admin";
import ProtectedRoute from "../components/ProtectedRoute";

// Dashboard
import Archive from "./Dashboard/Archive";
import FAQ from "./Dashboard/FAQ";
import InnovationIndicator from "./Dashboard/InnovationIndicator";
import InovationStatistic from "./Dashboard/InovationStatistic";
import Siagas from "./Dashboard/Siagas";

// Penilaian Indeks
import RegionalInnovationReview from "./IndexRating/RegionalInnovationReview";
import RejectedInnovation from "./IndexRating/RejectedInnovation";
import ReviewResult from "./IndexRating/ReviewResult";
import QualityControl from "./IndexRating/QualityControl";
import IndexRanking from "./IndexRating/IndexRanking";
import FinalIndex from "./IndexRating/FinalIndex";

// Database Inovasi Daerah
import PemdaProfile from "./DatabaseInnovation/PemdaProfile";
import RegionalInnovation from "./DatabaseInnovation/RegionalInnovation";

// Governement Innovation
import ReviewRanking from "./GovernmentInnovate/ReviewRanking";
import AchievmentResult from "./GovernmentInnovate/AchievmentResult";
import SiagasRanking from "./GovernmentInnovate/SiagasRanking";

import Login from "./Login";

//Report
import AverageAnalysis from "./Report/AverageAnalysis";
import NationalInnovate from "./Report/NationalInnovate";
import RegionInnovate from "./Report/RegionInnovate";
import ProvinceInnovate from "./Report/ProvinceInnovate";
import CityInnovate from "./Report/CityInnovate";
import RegencyInnovate from "./Report/RegencyInnovate";
import BorderInnovate from "./Report/BorderInnovate";
import LeftBehindInnovate from "./Report/LeftBehindInnovate";
import PapuaIndex from "./Report/PapuaIndex";
import InnovationType from "./Report/InnovationType";
import InnovationForm from "./Report/InnnovationForm";
import GovernmentAffairs from "./Report/GovernmentAffairs";
import Initiator from "./Report/Initiator";

// Guest
import GuesLayout from "../components/Layout/Guest";
import Announcement from "./Guest/Annoucement";
import Guide from "./Guest/Guide";
import YearReport from "./Guest/YearReport";
import Document from "./Guest/Document";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Siagas />,
        },
        {
          path: "/statistik-inovasi",
          element: <InovationStatistic />,
        },
        {
          path: "/statistik-indikator-inovasi",
          element: <InnovationIndicator />,
        },
        {
          path: "/arsip",
          element: <Archive />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },

        //Penilaian Indeks
        {
          path: "/review-inovasi-daerah",
          element: <RegionalInnovationReview />,
        },
        {
          path: "/hasil-review",
          element: <ReviewResult />,
        },
        {
          path: "/inovasi-ditolak",
          element: <RejectedInnovation />,
        },
        {
          path: "/quality-control",
          element: <QualityControl />,
        },
        {
          path: "/ranking-indeks",
          element: <IndexRanking />,
        },
        {
          path: "/rekap-indeks-akhir",
          element: <FinalIndex />,
        },
        // Database Inovasi Daerah
        {
          path: "/profil-pemda",
          element: <PemdaProfile />,
        },
        {
          path: "/inovasi-daerah",
          element: <RegionalInnovation />,
        },
        {
          path: "/peringkat-hasil-review",
          element: <ReviewRanking />,
        },
        {
          path: "/prestasi-hasil-lapangan",
          element: <AchievmentResult />,
        },
        {
          path: "/ranking-siagas",
          element: <SiagasRanking />,
        },
        {
          path: "/analisis-rata",
          element: <AverageAnalysis />,
        },
        {
          path: "/inovasi-nasional",
          element: <NationalInnovate />,
        },
        {
          path: "/inovasi-wilayah",
          element: <RegionInnovate />,
        },
        {
          path: "/inovasi-provinsi",
          element: <ProvinceInnovate />,
        },
        {
          path: "/inovasi-kota",
          element: <CityInnovate />,
        },
        {
          path: "/inovasi-kabupaten",
          element: <RegencyInnovate />,
        },
        {
          path: "/inovasi-perbatasan",
          element: <BorderInnovate />,
        },
        {
          path: "/inovasi-tertinggal",
          element: <LeftBehindInnovate />,
        },
        {
          path: "/inovasi-papua",
          element: <PapuaIndex />,
        },
        {
          path: "/rekap-jenis-inovasi",
          element: <InnovationType />,
        },
        {
          path: "/rekap-bentuk-inovasi",
          element: <InnovationForm />,
        },
        {
          path: "/rekap-urusan-pemerintah",
          element: <GovernmentAffairs />,
        },
        {
          path: "/rekap-urusan-pemerintah",
          element: <GovernmentAffairs />,
        },
        {
          path: "/rekap-inisiator",
          element: <Initiator />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <GuesLayout />,
      children : [
        {
          path : "/pengumuman",
          element : <Announcement />
        },
        {
          path : "/panduan",
          element : <Guide />
        },
        {
          path : "/laporan-tahunan",
          element : <YearReport />
        },
        {
          path : "/dokumen",
          element : <Document />
        },
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
