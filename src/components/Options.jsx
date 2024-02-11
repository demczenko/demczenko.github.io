import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

const Options = ({ title, options, style }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hover:bg-[#888888] text-white h-8 w-8 transition-colors",
            style
          )}
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#111111] backdrop-blur-xl border-none text-white">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator className={"bg-[#363636]"} />
        {options.map((option) => (
          <DropdownMenuItem className="cursor-pointer" key={option.id} onClick={option?.onClick}>
            {"icon" in option && option.icon}
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
