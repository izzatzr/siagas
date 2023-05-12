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
import RegencyInnovate from "./Report/RegencyInnovate";
import OPDInnovation from "./Report/OPDInnovation";
import DistrictInnovate from "./Report/DistrictInnovate";
import InnovationType from "./Report/InnovationType";
import BusinessInnovate from "./Report/BusinessInnovate";
import InitiatorInnovate from "./Report/InitiatorInnovate";

// Guest
import GuesLayout from "../components/Layout/Guest";
import Announcement from "./Guest/Annoucement";
import Guide from "./Guest/Guide";
import YearReport from "./Guest/YearReport";
import Document from "./Guest/Document";
import GovernmentBusiness from "./MasterData/GovernmentBusiness";
import FormGovernmentBusiness from "./MasterData/GovernmentBusiness/FormGovernmentBusiness";
import Regional from "./MasterData/Regional";
import FormRegional from "./MasterData/Regional/FormRegional";
import Indicator from "./MasterData/Indicator";
import Wilayah from "./MasterData/Wilayah";
import FormWilayah from "./MasterData/Wilayah/FormWilayah";
import DocumentCategory from "./MasterData/DocumentCategory";
import FormIndicator from "./MasterData/Indicator/FormIndicator";
import AnnouncementDashboard from "./MasterData/AnnouncementDashboard";
import FormAnnouncementDashboard from "./MasterData/AnnouncementDashboard/FormAnnouncementDashboard";
import FAQDashboard from "./MasterData/FAQDashboard";
import FormFAQDashboard from "./MasterData/FAQDashboard/FormFAQDashboard";
import DocumentDashboard from "./MasterData/DocumentDashboard";
import FormDocumentDashboard from "./MasterData/DocumentDashboard/FormDocumentDashboard";

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
        //Report
        {
          path: "/inovasi-kabupaten",
          element: <RegencyInnovate />,
        },
        {
          path: "/inovasi-opd",
          element: <OPDInnovation />,
        },
        {
          path: "/inovasi-distrik",
          element: <DistrictInnovate />,
        },
        {
          path: "/rekap-jenis-inovasi",
          element: <InnovationType />,
        },
        {
          path: "/rekap-inovasi-urusan",
          element: <BusinessInnovate />,
        },
        {
          path: "/rekap-inovasi-inisiator",
          element: <InitiatorInnovate />,
        },
        //Master Data
        {
          path: "/master/urusan-pemerintah",
          element: <GovernmentBusiness />,
        },
        {
          path: "/master/urusan-pemerintah/:action/:id?",
          element: <FormGovernmentBusiness />,
        },
        {
          path: "/master/opd-daerah",
          element: <Regional />,
        },
        {
          path: "/master/opd-daerah/:action/:id?",
          element: <FormRegional />,
        },
        {
          path: "/master/indikator",
          element: <Indicator />,
        },
        {
          path: "/master/indikator/:action/:id?",
          element: <FormIndicator />,
        },
        {
          path: "/master/indikator/:indicator_id/scale-indicator",
          element: <FormIndicator />,
        },
        {
          path: "/master/opd-daerah/:action/:id?",
          element: <FormRegional />,
        },
        {
          path: "/master/wilayah",
          element: <Wilayah />,
        },
        {
          path: "/master/wilayah/:action/:id?",
          element: <FormWilayah />,
        },

        {
          path: "/master/kategori-dokumen",
          element: <DocumentCategory />,
        },
        {
          path: "/master/pengumuman",
          element: <AnnouncementDashboard />,
        },
        {
          path: "/master/pengumuman/:action/:id?",
          element: <FormAnnouncementDashboard />,
        },
        {
          path: "/master/faq",
          element: <FAQDashboard />,
        },
        {
          path: "/master/faq/:action/:id?",
          element: <FormFAQDashboard />,
        },
        {
          path: "/master/dokumen",
          element: <DocumentDashboard />,
        },
        {
          path: "/master/dokumen/:action/:id?",
          element: <FormDocumentDashboard />,
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
      children: [
        {
          path: "/pengumuman",
          element: <Announcement />,
        },
        {
          path: "/panduan",
          element: <Guide />,
        },
        {
          path: "/laporan-tahunan",
          element: <YearReport />,
        },
        {
          path: "/dokumen",
          element: <Document />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
