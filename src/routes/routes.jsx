import App from "@/App";
import { Projects, Templates } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
