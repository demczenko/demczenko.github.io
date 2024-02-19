import { Link, useLocation } from "react-router-dom";
import { Logo } from ".";
import { cn } from "@/lib/utils";
import { navigation } from "@/constance/navigation";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-w-[320px] px-2 bg-[#111111] md:block hidden">
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

const NavItem = ({ path, name, isActive, icon, children, isChildren }) => {
  const { pathname } = useLocation();

  const Icon = icon;

  return (
    <>
      <li
        className={cn(
          "px-2 py-1 hover:text-white transition-colors rounded-md flex items-center text-neutral-400",
          {
            "text-white font-semibold bg-[#252525]": isActive,
          }
        )}
      >
        {icon && <Icon className="h-4 w-4 mr-2" />}
        <Link className="grow" to={path}>
          {name}
        </Link>
      </li>
      {children && (
        <ol style={{ paddingLeft: "1rem" }}>
          {children.map((item) => (
            <NavItem
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

export default Sidebar;
