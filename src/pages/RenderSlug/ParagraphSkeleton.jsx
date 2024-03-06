import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ParagraphSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-20 w-full" />
    </div>
  );
};

export default ParagraphSkeleton;
