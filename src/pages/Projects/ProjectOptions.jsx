import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";

const ProjectOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-[#888888] text-white h-8 w-8 transition-colors" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#363636] text-white border-2 border-[#363636]">
        <DropdownMenuLabel>Manage project</DropdownMenuLabel>
        <DropdownMenuSeparator className={"bg-[#363636]"} />
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSeparator className={"bg-[#363636]"} />
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectOptions;
