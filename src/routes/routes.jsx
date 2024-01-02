import App from "@/App";
import ErrorPage from "@/ErrorPage";
import { Projects, Templates } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "templates",
        element: <Templates />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
]);
