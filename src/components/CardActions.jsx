import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CardActions = ({ actions }) => {
  return (
    <>
      <DesktopActions actions={actions} />
      <MobileActions actions={actions} />
    </>
  );
};

const DesktopActions = ({ actions }) => {
  return (
    <div className="gap-2 items-center justify-start md:flex hidden">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="bg-slate-950 rounded-md text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
          onClick={action.onClick}
        >
          {"icon" in action && action.icon} {action.name}
        </Button>
      ))}
    </div>
  );
};

const MobileActions = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden block" asChild>
        <Button variant="secondary" className="bg-slate-950 rounded-md text-xs text-blue-300 hover:text-blue-600">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.id}
            className="bg-slate-950 rounded-md text-xs text-blue-300 hover:text-blue-600 p-3 cursor-pointer"
            onClick={action.onClick}
          >
            {"icon" in action && action.icon} {action.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CardActions;
