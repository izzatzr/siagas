import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../components/Layout/Admin";
import Siagas from "./Dashboard/Siagas";
import Login from "./Login";

const MainRoutes = () => {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <AdminLayout />,
      children : [
        {
          path : '/',
          element : <Siagas />
        },
        {
          path : '/statistik-inovasi',
          element : <Siagas />
        }
      ]
    },
    {
      path : "/login",
      element : <Login />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default MainRoutes;
