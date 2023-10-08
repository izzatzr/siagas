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
import InnovationType from "./Report/InnovationType";
import InnovationForm from "./Report/InnovationForm";
import GovernmentAffairs from "./Report/GovernmentAffairs";
import InnovationInitiator from "./Report/InnovationInitiator";

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

// Configuration
import UserAccount from "./Configuration/UserAccount";
import OPDList from "./Configuration/OPDList";
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
import Rawlog from "./MasterData/Rawlog";
import UserAccountEdit from "./Configuration/UserAccount/UserAccountEdit";
import UserAccountCreate from "./Configuration/UserAccount/UserAccountCreate";
import OPDCreate from "./Configuration/OPDList/OPDCreate";
import OPDEdit from "./Configuration/OPDList/OPDEdit";
import UPTDListCreate from "./Configuration/UPTDList/UPTDListCreate";
import UPTDListEdit from "./Configuration/UPTDList/UPTDListEdit";
import TuxedoCreate from "./Configuration/Tuxedo/TuxedoCreate";
import TuxedoEdit from "./Configuration/Tuxedo/TuxedoEdit";
import SettingCreate from "./Configuration/Setting/SettingCreate";
import SettingEdit from "./Configuration/Setting/SettingEdit";

// Index Rating
import RegionalInnovationReviewDetail from "./IndexRating/RegionalInnovationReview/RegionalInnovationReviewDetail";
import RegionalInnovationReviewInnovationProfile from "./IndexRating/RegionalInnovationReview/RegioanlInnovationReviewInnovationProfile";
import RegionalInnovationReviewIndicator from "./IndexRating/RegionalInnovationReview/RegionalInnovationReviewIndicator";
import RegioanlInnovationReviewInnovationEvaluation from "./IndexRating/RegionalInnovationReview/RegionalInnovationReviewEvaluation";
import RegionalGovernmentInnovation from "./InnovationCompetition/RegionalGovernmentInnovation";
import PublicInnovation from "./InnovationCompetition/PublicInnovation";
import PublicInnovationEdit from "./InnovationCompetition/PublicInnovation/PublicInnovationEdit";
import RegionalGovernmentInnovationCreate from "./InnovationCompetition/RegionalGovernmentInnovation/RegionalGovernmentInnovationCreate";
import Authorization from "../components/Authorization";
import RegionalInnovationDetail from "./DatabaseInnovation/RegionalInnovation/Detail";
import InnovationRegionalSupportDocument from "./DatabaseInnovation/RegionalInnovation/Detail/InnovationRegionalSupportDocument";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
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
          element: (
            <Authorization roles={["Super Admin", "User"]}>
              <Siagas />
            </Authorization>
          ),
        },
        {
          path: "/statistik-inovasi",
          element: (
            <Authorization roles={["Super Admin", "User"]}>
              <InovationStatistic />
            </Authorization>
          ),
        },
        {
          path: "/statistik-indikator-inovasi",
          element: (
            <Authorization roles={["Super Admin", "User"]}>
              <InnovationIndicator />
            </Authorization>
          ),
        },
        {
          path: "/arsip",
          element: (
            <Authorization roles={["Super Admin", "User"]}>
              <Archive />
            </Authorization>
          ),
        },
        {
          path: "/faq",
          element: (
            <Authorization roles={["Super Admin", "User"]}>
              <FAQ />
            </Authorization>
          ),
        },

        //Penilaian Indeks
        {
          path: "/review-inovasi-daerah",
          element: (
            <Authorization roles={["Super Admin"]}>
              <RegionalInnovationReview />
            </Authorization>
          ),
        },
        {
          path: "/review-inovasi-daerah/detail/:id?",
          element: (
            <Authorization roles={["Super Admin"]}>
              <RegionalInnovationReviewDetail />
            </Authorization>
          ),
          children: [
            {
              path: "",
              element: <RegionalInnovationReviewInnovationProfile />,
            },
            {
              path: "indicator",
              element: <RegionalInnovationReviewIndicator />,
            },
            {
              path: "evaluation/:evaluationId?",
              element: <RegioanlInnovationReviewInnovationEvaluation />,
            },
          ],
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

        //Report
        ...reportRoutesWithAuthorization,
        // Database Inovasi Daerah
        ...innovationDatabaseRoutesWithAuthorization,
        // Innovation Competition
        ...innovationCompetitionWithAuthorization,
        //Master Data
        ...masterDataRoutesWithAuthorization,
        // Configuration
        ...configurationRoutesWithAuthorization,
      ],
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
          path: "/petunjuk-teknis",
          element: <Guide title="Petunjuk Teknis Siagas 2023" />,
        },
        {
          path: "/manual-book",
          element: <Guide title="Manual Book Siagas 2023" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

const reportRoutes = [
  {
    path: "/inovasi-kabupaten",
    element: <RegencyInnovate />,
    roles: ["Super Admin"],
  },
  {
    path: "/rekap-jenis-inovasi",
    element: <InnovationType />,
    roles: ["Super Admin"],
  },
  {
    path: "/rekap-bentuk-inovasi",
    element: <InnovationForm />,
    roles: ["Super Admin"],
  },
  {
    path: "/rekap-urusan-pemerintah",
    element: <GovernmentAffairs />,
    roles: ["Super Admin"],
  },
  {
    path: "/rekap-berdasarkan-inisiator",
    element: <InnovationInitiator />,
    roles: ["Super Admin"],
  },
];

const innovationCompetition = [
  {
    path: "/lomba/inovasi-pemerintah-daerah",
    element: <RegionalGovernmentInnovation />,
    roles: ["User"],
  },
  {
    path: "/lomba/inovasi-pemerintah-daerah/:action/:id?",
    element: <RegionalGovernmentInnovationCreate />,
    roles: ["User"],
  },
  {
    path: "/lomba/inovasi-masyarakat",
    element: <PublicInnovation />,
    roles: ["User"],
  },
  {
    path: "/lomba/inovasi-masyarakat/:action/:id?",
    element: <PublicInnovationEdit />,
    roles: ["User"],
  },
];

const configurationRoutes = [
  {
    path: "/konfigurasi/user-account",
    element: <UserAccount />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/user-account/:action",
    element: <UserAccountCreate />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/user-account/:action/:id?",
    element: <UserAccountEdit />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-opd",
    element: <OPDList />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-opd/:action",
    element: <OPDCreate />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-opd/:action/:id?",
    element: <OPDEdit />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-uptd",
    element: <UPTDList />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-uptd/:action",
    element: <UPTDListCreate />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/daftar-uptd/:action/:id?",
    element: <UPTDListEdit />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/tuxedo",
    element: <Tuxedo />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/tuxedo/:action",
    element: <TuxedoCreate />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/tuxedo/:action/:id?",
    element: <TuxedoEdit />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/setting",
    element: <Setting />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/setting/:action",
    element: <SettingCreate />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/konfigurasi/setting/:action/:id?",
    element: <SettingEdit />,
    roles: ["Super Admin", "User"],
  },
];

const innovationDatabaseRoutes = [
  {
    path: "/profil-pemda",
    element: <PemdaProfile />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/profil-pemda/:action/:id?",
    element: <PemdaProfileForm />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/profil-pemda/:id/input-indikator",
    element: <IndicatorInputSPD />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "profil-pemda/:id/detail",
    element: <Detail />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "profil-pemda/:id/detail/:indicator/dokumen-pendukung",
    element: <SupportDocument />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/inovasi-daerah",
    element: <RegionalInnovation />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/inovasi-daerah/:action/:id?",
    element: <RegionalInnovationForm />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/inovasi-daerah/:id/indikator",
    element: <RegionalInnovationDetail />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "inovasi-daerah/:id/indikator/:indicator/dokumen-pendukung",
    element: <InnovationRegionalSupportDocument />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/peringkat-hasil-review",
    element: <ReviewRanking />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/prestasi-hasil-lapangan",
    element: <AchievmentResult />,
    roles: ["Super Admin", "User"],
  },
  {
    path: "/ranking-siagas",
    element: <SiagasRanking />,
    roles: ["Super Admin", "User"],
  },
];

const masterDataRoutes = [
  {
    path: "/master/tim-penilaian",
    element: <AssessmentTeam />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/tim-penilaian/:action",
    element: <AssessmentTeamForm />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/urusan-pemerintah",
    element: <GovernmentBusiness />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/urusan-pemerintah/:action/:id?",
    element: <FormGovernmentBusiness />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/indikator",
    element: <Indicator />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/indikator/:action/:id?",
    element: <FormIndicator />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/indikator/:indicator_id/scale-indicator",
    element: <FormIndicator />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/kategori-dokumen",
    element: <DocumentCategory />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/kategori-dokumen/:action/:id?",
    element: <DocumentCategoryForm />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/pengumuman",
    element: <AnnouncementDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/pengumuman/:action/:id?",
    element: <FormAnnouncementDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/faq",
    element: <FAQDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/faq/:action/:id?",
    element: <FormFAQDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/dokumen",
    element: <DocumentDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/dokumen/:action/:id?",
    element: <FormDocumentDashboard />,
    roles: ["Super Admin"],
  },
  {
    path: "/master/rawlog/:id?",
    element: <Rawlog />,
    roles: ["Super Admin"],
  },
];

const reportRoutesWithAuthorization = reportRoutes.map((route) => ({
  ...route,
  element: <Authorization roles={route.roles}>{route.element}</Authorization>,
}));

const innovationCompetitionWithAuthorization = innovationCompetition.map(
  (route) => ({
    ...route,
    element: <Authorization roles={route.roles}>{route.element}</Authorization>,
  })
);

const configurationRoutesWithAuthorization = configurationRoutes.map(
  (route) => ({
    ...route,
    element: <Authorization roles={route.roles}>{route.element}</Authorization>,
  })
);

const innovationDatabaseRoutesWithAuthorization = innovationDatabaseRoutes.map(
  (route) => ({
    ...route,
    element: <Authorization roles={route.roles}>{route.element}</Authorization>,
  })
);

const masterDataRoutesWithAuthorization = masterDataRoutes.map((route) => ({
  ...route,
  element: <Authorization roles={route.roles}>{route.element}</Authorization>,
}));

export default Routes;
