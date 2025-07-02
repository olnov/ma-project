import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
//Wraps protected pages - pass in page/ component that requires authentication for access
  // e.g. <ProtectedRoute component={<PageFileName>} />

// Layouts
import TopBarLayout from "./layouts/TopBarLayout.jsx";
import NoTopBarLayout from "./layouts/NoTopBarLayout.jsx";

// Pages
import NotFound from "./pages/NotFound.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import UserAccount from "./pages/UserAccount.jsx";
import FeedbackFormPage from "./pages/FeedBackFormPage.jsx";
import ShareableProfilePage from "./pages/shareable-profile/ShareableProfilePage.jsx";

// Dev pages
import SyncUserTestPage from "./pages/dev/SyncUser.jsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: (
      <NoTopBarLayout>
        <HomePage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/feedback/:linkUuid",
    element: (
      <NoTopBarLayout>
        <FeedbackFormPage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/shareable-profile/:userId",
    element: (
      <NoTopBarLayout>
        <ShareableProfilePage />
      </NoTopBarLayout>
    ),
  },
  {
    path: "/create-campaign",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={CreateCampaign} />
      </TopBarLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={DashboardPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "/details/:campaignId",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={DetailsPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "/me",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={UserAccount} />
      </TopBarLayout>
    ),
  },
  {
    // DEV PAGE
    path: "/sync-test",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={SyncUserTestPage} />
      </TopBarLayout>
    ),
  },
  {
    path: "*",
    element: (
      <NoTopBarLayout>
        <NotFound />
      </NoTopBarLayout>
    ),
  },
]);

export default router;