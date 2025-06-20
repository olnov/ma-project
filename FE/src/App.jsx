import { RouterProvider } from "react-router-dom";
import router from "./router"; 
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import AuthSync from "./components/authentication/AuthSync";


const App = () => {
  return (
    <>
      {/* Need to get this to triger only once upon registration*/}
      <AuthSync /> 
      {/* Automatically runs when user logs in. syncs Auth0 user profile with user in mongoDB */}
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
