import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ToolbarSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-8 w-16" />
    </div>
  );
};

export default ToolbarSkeleton;
