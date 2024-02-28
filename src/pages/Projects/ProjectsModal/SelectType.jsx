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

const types = [
  {
    id: 1,
    title: "Text",
    type: "text",
  },
  {
    id: 2,
    title: "Link",
    type: "href",
  },
  {
    id: 3,
    title: "Image",
    type: "src",
  },
];

export function SelectType({ value, onSelect }) {
  const [open, setOpen] = useState(false);

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
            ? types.find((type) => type.type === value)?.title
            : "Select type"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search type..." className="h-9" />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup>
            {types?.map((type) => (
              <CommandItem
                value={type.id}
                key={type.id}
                onSelect={() => {
                  onSelect(type.type);
                  setOpen(false);
                }}>
                {type.title}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    type.id === value ? "opacity-100" : "opacity-0"
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
