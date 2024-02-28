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
import { SkeletonCard } from "@/components/SkeletonCard";
import { useColumns } from "@/hooks/columns/useColumns";

export function SelectColumn({ value, onSelect }) {
  const { data: templates, isLoading, isError } = useColumns();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while templates loading...`} />
    );
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
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
            {templates?.map((template) => (
              <CommandItem
              className="capitalize"
                value={template.id}
                key={template.id}
                onSelect={() => {
                  onSelect(template.id);
                  setOpen(false);
                }}>
                {template.header}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    template.id === value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
