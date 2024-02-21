import { DashboardIcon } from "@radix-ui/react-icons";
import {
  Archive,
  Columns3,
  ComponentIcon,
  FolderOpen,
  Table,
  User2,
} from "lucide-react";

export const navigation = [
  {
    id: 7,
    path: "/components",
    name: "Components",
    icon: ComponentIcon,
  },
  {
    id: 1,
    path: "/",
    name: "Dashboard",
    icon: DashboardIcon,
  },
  {
    id: 6,
    path: "/tables",
    name: "Tables",
    icon: Table,
  },
  {
    id: 2,
    path: "/templates",
    name: "Templates",
    icon: Columns3,
    children: [
      {
        id: 1,
        path: "/templates/archive",
        name: "Archive",
        icon: Archive,
      },
    ],
  },
  {
    id: 3,
    path: "/projects",
    name: "Projects",
    icon: FolderOpen,
    children: [
      {
        id: 1,
        path: "/projects/archive",
        name: "Archive",
        icon: Archive,
      },
    ],
  },

];
