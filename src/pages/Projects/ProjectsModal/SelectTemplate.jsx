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
import { useTemplates } from "@/hooks/templates/useTemplates";
import { SkeletonCard } from "@/components/SkeletonCard";
import { PageContainer } from "@/pages";

export function SelectTemplate({ value, onSelect }) {
  const { data: templates, isLoading, isError } = useTemplates();
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <PageContainer>
        <SkeletonCard />
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
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
            ? templates.find((template) => template.id === value)?.template_name
            : "Select template"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search template..." className="h-9" />
          <CommandEmpty>No template found.</CommandEmpty>
          <CommandGroup>
            {templates?.map((template) => (
              <CommandItem
                value={template.name}
                key={template.id}
                onSelect={() => {
                  onSelect(template.id);
                  setOpen(false);
                }}>
                {template.template_name}
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
