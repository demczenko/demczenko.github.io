import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LayoutLoading = () => {
  return (
    <div className="flex justify-center flex-col gap-4 max-w-[650px] mx-auto w-full">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
};

export default LayoutLoading;
