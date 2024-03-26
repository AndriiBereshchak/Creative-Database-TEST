import { Navigate, RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/guest/Home/Home";

const publicRoutes: RouteObject[] = [
  { path: "/home", element: <Home /> },
  { path: "*", element: <Navigate to="/home" replace /> },
];

export const publicRouter = createBrowserRouter(publicRoutes);
