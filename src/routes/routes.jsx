import App from "@/App";
import ErrorPage from "@/ErrorPage";
import {
  Component,
  Components,
  Project,
  Projects,
  ProjectsArchive,
  Table,
  Template,
  Templates,
  TemplatesArchive,
} from "@/pages";
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
        element: <Template />,
      },
      {
        path: "templates/archive",
        element: <TemplatesArchive />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <Project />,
      },
      {
        path: "projects/archive",
        element: <ProjectsArchive />,
      },
      {
        path: "table/:id",
        element: <Table />,
      },
      {
        path: "components",
        element: <Components />,
      },
      {
        path: "components/:id",
        element: <Component />,
      },
    ],
  },
]);
