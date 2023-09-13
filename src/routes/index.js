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
import PemdaProfileForm from "./DatabaseInnovation/PemdaProfile/Form";
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
import Indicator from "./MasterData/Indicator";
import DocumentCategory from "./MasterData/DocumentCategory";
import FormIndicator from "./MasterData/Indicator/FormIndicator";
import AnnouncementDashboard from "./MasterData/AnnouncementDashboard";
import FormAnnouncementDashboard from "./MasterData/AnnouncementDashboard/FormAnnouncementDashboard";
import FAQDashboard from "./MasterData/FAQDashboard";
import FormFAQDashboard from "./MasterData/FAQDashboard/FormFAQDashboard";
import DocumentDashboard from "./MasterData/DocumentDashboard";
import FormDocumentDashboard from "./MasterData/DocumentDashboard/FormDocumentDashboard";
import AssessmentTeam from "./MasterData/AssessmentTeam";
import UserAccount from "./Configuration/UserAccount";
import OPDList from "./Configuration/OPDList";
import APIAccess from "./Configuration/APIAccess";
import Setting from "./Configuration/Setting";
import Tuxedo from "./Configuration/Tuxedo";
import UPTDList from "./Configuration/UPTDList";
import Detail from "./DatabaseInnovation/PemdaProfile/Detail";
import SupportDocument from "./DatabaseInnovation/PemdaProfile/Detail/SupportDocument";
import IndicatorInputSPD from "./DatabaseInnovation/PemdaProfile/IndicatorInputSPD";
import RegionalInnovationForm from "./DatabaseInnovation/RegionalInnovation/Form";
import IndicatorRegionalInnovation from "./DatabaseInnovation/RegionalInnovation/Indicator";
import AssessmentTeamForm from "./MasterData/AssessmentTeam/Form";
import DocumentCategoryForm from "./MasterData/DocumentCategory/Form";

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
        ...innovationDatabaseRoutes,
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
        ...masterDataRoutes,
        // Configuration
        ...configurationRoutes,
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

const masterDataRoutes = [
  {
    path: "/master/tim-penilaian",
    element: <AssessmentTeam />,
  },
  {
    path: "/master/tim-penilaian/:action",
    element: <AssessmentTeamForm />,
  },
  {
    path: "/master/urusan-pemerintah",
    element: <GovernmentBusiness />,
  },
  {
    path: "/master/urusan-pemerintah/:action/:id?",
    element: <FormGovernmentBusiness />,
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
    path: "/master/kategori-dokumen",
    element: <DocumentCategory />,
  },
  {
    path: "/master/kategori-dokumen/:action/:id?",
    element: <DocumentCategoryForm />,
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
];

const innovationDatabaseRoutes = [
  {
    path: "/profil-pemda",
    element: <PemdaProfile />,
  },
  {
    path: "/profil-pemda/:action/:id?",
    element: <PemdaProfileForm />,
  },
  {
    path: "/profil-pemda/:id/input-indikator",
    element: <IndicatorInputSPD />,
  },
  {
    path: "profil-pemda/:id/detail",
    element: <Detail />,
  },
  {
    path: "profil-pemda/:id/detail/:indicator/dokumen-pendukung",
    element: <SupportDocument />,
  },
  {
    path: "/inovasi-daerah",
    element: <RegionalInnovation />,
  },
  {
    path: "/inovasi-daerah/:action/:id?",
    element: <RegionalInnovationForm />,
  },
  {
    path: "inovasi-daerah/:id/indicator",
    element: <IndicatorRegionalInnovation />,
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
];

const configurationRoutes = [
  {
    path: "/konfigurasi/user-account",
    element: <UserAccount />,
  },
  {
    path: "/konfigurasi/daftar-opd",
    element: <OPDList />,
  },
  {
    path: "/konfigurasi/daftar-uptd",
    element: <UPTDList />,
  },
  {
    path: "/konfigurasi/tuxedo",
    element: <Tuxedo />,
  },
  {
    path: "/konfigurasi/setting",
    element: <Setting />,
  },
  {
    path: "/konfigurasi/akses-api",
    element: <APIAccess />,
  },
];

export default Routes;
