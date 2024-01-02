import App from "@/App";
import ErrorPage from "@/ErrorPage";
import { Projects, Template, Templates } from "@/pages";
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
        path: "templates/:id",
        element: <Template />
      },
      {
        path: "projects",
        element: <Projects />,
      },
    ],
  },
]);
