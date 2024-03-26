import { RouterProvider } from "react-router-dom";
import { publicRouter } from "./router/publicRouter";

export const AppRouter = () => {
  return <RouterProvider router={publicRouter} />;
};
