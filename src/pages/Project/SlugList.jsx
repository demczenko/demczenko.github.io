import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const SlugList = ({ slugs, selectedSlug, onSlugSelect }) => {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4">
        {slugs.map((slug) => (
          <Button
            className={selectedSlug === slug ? "text-primary" : "text-white"}
            size="sm"
            key={slug}
            variant={selectedSlug === slug ? "outline" : "ghost"}
            onClick={() => onSlugSelect(slug)}>
            {slug}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default SlugList;
