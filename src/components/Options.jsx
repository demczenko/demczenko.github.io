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
import React from "react";

const Options = ({ title, options, style }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("hover:bg-[#888888] text-white h-8 w-8 transition-colors", style)} size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#363636] text-white border-2 border-[#363636]">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator className={"bg-[#363636]"} />
        {
          options.map(option => <DropdownMenuItem key={option.id} onClick={option.onClick}>{option.name}</DropdownMenuItem>)
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Options;
