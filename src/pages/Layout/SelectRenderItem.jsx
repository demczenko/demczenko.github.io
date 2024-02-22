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
import { useComponents } from "@/hooks/components/useComponents";

export function SelectRenderItem({ value, onSelect }) {
  const {
    data: templates,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
  } = useTemplates();
  const {
    data: components,
    isLoading: isComponentsLoading,
    isError: isComponentsError,
  } = useComponents();
  const [open, setOpen] = useState(false);

  if (isTemplatesLoading || isComponentsLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isTemplatesError || isComponentsError) {
    return (
      <ErrorPage
        title={`Something went wrong while template or components loading...`}
      />
    );
  }

  const render_items = [...(templates ?? []), ...(components ?? [])];
  const selected_item = render_items.find((item) => item.id === value.id);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value.id
            ? "template_name" in selected_item
              ? selected_item.template_name
              : selected_item.component_name
            : "Select item"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <Command>
          <CommandInput placeholder="Search item..." className="h-9" />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {render_items?.map((item) => (
              <CommandItem
                value={item.id}
                key={item.id}
                onSelect={() => {
                  const type =
                    "template_name" in item ? "template" : "component";
                  onSelect({ id: item.id, type });
                  setOpen(false);
                }}
              >
                {"template_name" in item
                  ? item.template_name
                  : item.component_name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    item.id === value ? "opacity-100" : "opacity-0"
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
