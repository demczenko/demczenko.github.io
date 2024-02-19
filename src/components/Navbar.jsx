import React, { useState } from "react";
import { Logo } from ".";
import { navigation } from "@/constance/navigation";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MenuHeader onClick={() => setIsOpen(true)} />
      <Menu isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </>
  );
};

const MenuHeaderAbsolute = ({ onClick }) => {
  return (
    <div className="absolute left-0 right-0 px-4 md:hidden block">
      <Logo />
      <MenuIcon
        onClick={onClick}
        className=" text-white m-2 absolute top-3 cursor-pointer right-5 z-50 w-6 h-6"
      />
    </div>
  );
};

const MenuHeader = ({ onClick }) => {
  return (
    <div className="px-4 md:hidden block">
      <Logo />
      <MenuIcon
        onClick={onClick}
        className=" text-white m-2 absolute top-5  cursor-pointer right-5 z-50 w-6 h-6"
      />
    </div>
  );
};

const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={cn(
        "bg-[#111111] absolute pt-2 inset-0 z-50 transition-transform md:hidden block overflow-hidden",
        {
          "translate-x-0": isOpen,
          "-translate-x-[100%]": !isOpen,
        }
      )}
    >
      <MenuHeaderAbsolute onClick={() => setIsOpen(false)} />
      <ol className="space-y-6 flex h-full flex-col px-4 justify-center">
        {navigation.map((item) => (
          <NavItem key={item.id} {...item} setIsOpen={setIsOpen} />
        ))}
      </ol>
    </div>
  );
};

const NavItem = ({ name, icon, path, setIsOpen, children, isChildren }) => {
  const Icon = icon;
  const { pathname } = useLocation();

  return (
    <>
      <Link to={path} onClick={() => setIsOpen(false)}>
        <p
          className={cn(
            "text-4xl text-white font-bold flex items-center gap-4",
            {
              "text-xl font-normal": isChildren,
            }
          )}
        >
          {icon && (
            <Icon
              className={cn("h-6 w-6", {
                "h-4 w-4": isChildren,
              })}
            />
          )}
          <span>{name}</span>
        </p>
      </Link>

      {children && (
        <ol style={{ paddingLeft: "1rem", marginTop: ".6rem" }}>
          {children.map((item) => (
            <NavItem
              isChildren={true}
              isActive={pathname === item.path}
              key={item.id}
              {...item}
            />
          ))}
        </ol>
      )}
    </>
  );
};

export default Navbar;
