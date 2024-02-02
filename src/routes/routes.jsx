import App from "@/App";
import ErrorPage from "@/ErrorPage";
import {
  Component,
  Components,
  Login,
  Project,
  Projects,
  ProjectsArchive,
  RenderSlug,
  Table,
  Tables,
  Template,
  Templates,
  TemplatesArchive,
  TemplatesLayouts,
  Users,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "templates",
          element: <Templates />,
          errorElement: <ErrorPage />,
        },
        {
          path: "templates/:id",
          element: <Template />,
          errorElement: <ErrorPage />,
        },
        {
          path: "templates/archive",
          element: <TemplatesArchive />,
          errorElement: <ErrorPage />,
        },
        {
          path: "templates/layouts",
          element: <TemplatesLayouts />,
          errorElement: <ErrorPage />,
        },
        {
          path: "projects",
          element: <Projects />,
          errorElement: <ErrorPage />,
        },
        {
          path: "projects/:id",
          element: <Project />,
          errorElement: <ErrorPage />,
        },
        {
          path: "projects/:id/:slug",
          element: <RenderSlug />,
          errorElement: <ErrorPage />,
        },
        {
          path: "projects/archive",
          element: <ProjectsArchive />,
          errorElement: <ErrorPage />,
        },
        {
          path: "table/:id",
          element: <Table />,
          errorElement: <ErrorPage />,
        },
        {
          path: "components",
          element: <Components />,
          errorElement: <ErrorPage />,
        },
        {
          path: "components/:id",
          element: <Component />,
          errorElement: <ErrorPage />,
        },
        {
          path: "tables",
          element: <Tables />,
          errorElement: <ErrorPage />,
        },
        {
          path: "users",
          element: <Users />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
  ],
);
