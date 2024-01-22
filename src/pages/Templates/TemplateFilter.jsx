import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

const TemplateFilter = ({ onSelect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-sm text-sm mt-2">
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#363636] text-white border-2 border-[#363636]">
        <DropdownMenuItem onClick={() => onSelect("all")}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("isArchived")}>Archived</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TemplateFilter;
