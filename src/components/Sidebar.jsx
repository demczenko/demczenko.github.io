import {
  Archive,
  Columns,
  Columns2,
  Columns2Icon,
  Columns3,
  ComponentIcon,
  FolderOpen,
  Home,
  Table,
  Trash,
  User2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from ".";
import { DashboardIcon } from "@radix-ui/react-icons";

const navigation = [
  {
    id: 1,
    path: "/",
    name: "Dashboard",
    icon: <DashboardIcon className="h-4 w-4 mr-2" />,
  },
  {
    id: 6,
    path: "/tables",
    name: "Tables",
    icon: <Table className="h-4 w-4 mr-2" />,
  },
  {
    id: 7,
    path: "/components",
    name: "Components",
    icon: <ComponentIcon className="h-4 w-4 mr-2" />,
  },
  {
    id: 2,
    path: "/templates",
    name: "Templates",
    icon: <Columns3 className="h-4 w-4 mr-2" />,
    children: [
      {
        id: 1,
        path: "/templates/archive",
        name: "Archive",
        icon: <Archive className="h-3 w-3 mr-2" />,
      },
    ],
  },
  {
    id: 3,
    path: "/projects",
    name: "Projects",
    icon: <FolderOpen className="h-4 w-4 mr-2" />,
    children: [
      {
        id: 1,
        path: "/projects/archive",
        name: "Archive",
        icon: <Archive className="h-3 w-3 mr-2" />,
      },
    ],
  },
  {
    id: 5,
    path: "/users",
    name: "Users",
    icon: <User2 className="h-4 w-4 mr-2" />,
  },
];

const Sidebar = () => {
  const [open, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-w-[320px] px-2 bg-[#111111]">
      <Logo />
      <p className="text-white font-semibold text-xl mb-2">Navigation</p>
      <ol className="flex flex-col gap-1">
        {navigation.map((item) => (
          <NavItem isActive={pathname === item.path} key={item.id} {...item} />
        ))}
      </ol>
    </div>
  );
};

const NavItem = ({ path, name, isActive, icon, children }) => {
  return (
    <>
      <li
        className={`px-2 py-1 hover:text-white transition-colors rounded-md flex items-center ${
          isActive
            ? "text-white font-semibold bg-[#252525]"
            : "text-neutral-400"
        }`}>
        {icon && icon}
        <Link className="grow" to={path}>
          {name}
        </Link>
      </li>
      {children && (
        <ol style={{ paddingLeft: "1rem" }}>
          {children.map((item) => (
            <NavItem key={item.id} {...item} />
          ))}
        </ol>
      )}
    </>
  );
};

export default Sidebar;
