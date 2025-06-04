import { createBrowserRouter } from "react-router-dom";
import TopBarLayout from "./layouts/TopBarLayout.jsx";
import NoTopBarLayout from "./layouts/NoTopBarLayout.jsx";
import RequestFeedback from "./pages/RequestFeedback.jsx";
import Login from "./pages/Login.jsx";
import Demo from "./pages/demo.jsx";
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
  // {
  //   path: "/login", 
  //   element: (
  //     <Login />
  //   ),
  // },
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
        <RequestFeedback />
      </TopBarLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <TopBarLayout>
        <ProfilePage />
      </TopBarLayout>
    ),
  },
]);

export default router;