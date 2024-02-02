import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

const TemplateFilter = ({ filter, onSelect }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-sm text-sm mt-2">
          {filter === "all" && "All"}
          {filter === "isArchived" && "Archived"}
          {filter === "isNotArchived" && "Active"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-lg bg-[#363636] text-white border-2 border-[#363636]">
        <DropdownMenuItem className={`${filter === "all" ? "bg-neutral-50 text-gray-700 font-medium" : ""}`} onClick={() => onSelect("all")}>All</DropdownMenuItem>
        <DropdownMenuItem className={`${filter === "isArchived" ? "bg-neutral-50 text-gray-700 font-medium" : ""}`} onClick={() => onSelect("isArchived")}>Archived</DropdownMenuItem>
        <DropdownMenuItem className={`${filter === "isNotArchived" ? "bg-neutral-50 text-gray-700 font-medium" : ""}`} onClick={() => onSelect("isNotArchived")}>Active</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TemplateFilter;
