import { routes } from "./routes";
import { RouterProvider } from "react-router-dom";

export const Router = () => {
  return <RouterProvider router={routes} />;
};
