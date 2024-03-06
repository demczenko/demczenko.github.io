import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useColumns } from "@/hooks/columns/useColumns";
import ColumnSelectSkeleton from "./ColumnSelectSkeleton";

export function SelectColumn({ value, onSelect, query }) {
  const { data: templates, isLoading, isError } = useColumns(query);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <ColumnSelectSkeleton />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while columns loading...`} />
    );
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between capitalize",
            !value && "text-muted-foreground"
          )}>
          {value
            ? templates.find((template) => template.id === value)?.header
            : "Select column"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search column..." className="h-9" />
          <CommandEmpty>No column found.</CommandEmpty>
          <CommandGroup>
            {templates?.map((column) => {
              if (column.type === "slug") return;

              return (
                <CommandItem
                  className="capitalize"
                  value={column.id}
                  key={column.id}
                  onSelect={() => {
                    onSelect(column.id);
                    setOpen(false);
                  }}>
                  {column.header}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      column.id === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
