import { createBrowserRouter } from "react-router-dom";
import TopBarLayout from "./layouts/TopBarLayout.jsx";
import NoTopBarLayout from "./layouts/NoTopBarLayout.jsx";
import RequestFeedback from "./pages/RequestFeedback.jsx";
import Login from "./pages/Login.jsx"; //TODO: Remove or replace with Auth0 login page
import Demo from "./pages/demo.jsx";
import Profile from "./components/user/Profile.jsx";


const router = createBrowserRouter([
  {
    path: "/login", 
    element: (
      <NoTopBarLayout>
        <Login />
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
        <RequestFeedback />
      </TopBarLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <TopBarLayout>
        <Profile />
      </TopBarLayout>
    ),
  },
]);

export default router;