import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
//Wraps protected pages - pass in page/ component that requires authentication for access
  // e.g. <ProtectedRoute component={<PageFileName>} />

// Layouts
import TopBarLayout from "./layouts/TopBarLayout.jsx";
import NoTopBarLayout from "./layouts/NoTopBarLayout.jsx";

// Pages
import RequestFeedback from "./pages/RequestFeedback.jsx";
import Demo from "./pages/demo.jsx";
import NotFound from "./pages/NotFound.jsx";
import CreateCampaign from "./pages/CreateCampaign.jsx";
import DashboardStub from "./pages/DashboardStub.jsx";
import ProfilePage from "./pages/Profile.jsx";
import HomePage from "./pages/HomePage.jsx";

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
    path: "/demo",
    element: (
      <TopBarLayout>
        <Demo />
      </TopBarLayout>
    ),
  },
  {
    path: "/request-feedback",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={RequestFeedback} />
      </TopBarLayout>
    ),
  },
  {
    path: "/create-campaign",
    element: (
      <TopBarLayout>
        <CreateCampaign />
      </TopBarLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <TopBarLayout>
        <DashboardStub />
      </TopBarLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <TopBarLayout>
        <ProtectedRoute component={ProfilePage} />
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