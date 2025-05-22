import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Jobs from "./components/pages/Jobs";

import Contact from "./components/pages/Contact";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import JobDeatils from "./components/JobDeatils";
import Profile from "./components/pages/Profile";
import CompanyCreate from "./components/pages/CompanyCreate";
import CompanySetup from "./components/pages/CompanySetup";
import JobPost from "./components/pages/JobPost";
import Applicants from "./components/pages/Applicants";
import SaveJob from "./components/pages/SaveJob";
import Dashboard from "./components/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/saved/:id",
        element: <SaveJob />,
      },
      {
        path: "/deatils/:id",
        element: <JobDeatils />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/recruiter/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/recruiter/company/create",
        element: <CompanyCreate />,
      },
      {
        path: "//recruiter/job/create",
        element: <JobPost />,
      },
      {
        path: "/recruiter/company/:id",
        element: <CompanySetup />,
      },
      {
        path: "/recruiter/jobs/:id/applicants",
        element: <Applicants />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
