import App from "@/App";
import ErrorPage from "@/ErrorPage";
import {
  DataTable,
  Layouts,
  Layout,
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
  Users,
  Component,
  Components,
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
        path: "projects/:project_id/:layout_id/:slug",
        element: <RenderSlug />,
        errorElement: <ErrorPage />,
      },
      {
        path: "projects/archive",
        element: <ProjectsArchive />,
        errorElement: <ErrorPage />,
      },
      {
        path: "tables/:id",
        element: <Table />,
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
        path: "layouts",
        element: <Layouts />,
        errorElement: <ErrorPage />,
      },
      {
        path: "layouts/:id",
        element: <Layout />,
        errorElement: <ErrorPage />,
      },
      {
        path: "data_tables/:table_id/:id",
        element: <DataTable />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);
