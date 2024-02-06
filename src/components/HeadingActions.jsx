import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

const HeadingActions = ({ actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="hover:bg-[#888888] text-slate-900 transition-colors">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#363636] text-white border-2 border-[#363636]">
        {actions.map((action) => (
          <DropdownMenuItem onClick={action.onClick} key={action.id}>
            {"icon" in action && action.icon}
            {action.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingActions;
