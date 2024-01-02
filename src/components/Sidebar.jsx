import { Columns3, FolderOpen, Home } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from ".";

const navigation = [
  {
    id: 1,
    path: "/",
    name: "Home",
    icon: <Home className="h-4 w-4 mr-2"/>,
  },
  {
    id: 2,
    path: "/templates",
    name: "Templates",
    icon: <Columns3 className="h-4 w-4 mr-2" />,
  },
  {
    id: 3,
    path: "/projects",
    name: "Projects",
    icon: <FolderOpen className="h-4 w-4 mr-2"/>,
  },
];

const Sidebar = () => {
  const [open, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="w-1/6 min-w-[320px] px-2 bg-[#111111]">
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

const NavItem = ({ path, name, isActive, icon }) => {
  return (
    <li className={`px-2 py-1 hover:text-white transition-colors rounded-md flex items-center ${isActive ? "text-white font-semibold bg-[#252525]" : "text-neutral-400"}`}>
      {icon}
      <Link className="grow" to={path}>{name}</Link>
    </li>
  );
};

export default Sidebar;
