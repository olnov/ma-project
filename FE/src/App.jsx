import { RouterProvider } from "react-router-dom";
import router from "./router"; 
import { Toaster } from "@/components/ui/toaster";
import "./App.css";


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

// TODO: Move LoginButton and other Auth0 replated compnents to a separate route and page

// import LoginButton from './components/authentication/LoginButton';
// import LogoutButton from './components/authentication/LogoutButton';
// import UserProfile from './components/user/UserProfile';
// import ProtectedContent from './components/authentication/ProtectedContent';

// function App() {
//   return (
//     <div className="App">
//       <h1>Makers Agency Project 1</h1>
//       <LoginButton />
//       <LogoutButton />
//       <UserProfile />
//       <ProtectedContent />
//     </div>
//   )
// }

export default App;
