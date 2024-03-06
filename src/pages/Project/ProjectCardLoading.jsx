import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { PageContainer } from "..";

const ProjectCardLoading = () => {
  return (
    <PageContainer>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <Skeleton className={"h-[1000px] w-full"} />
        <div className="flex gap-4 flex-col w-full items-start">
          <Skeleton className={"h-20 w-full"} />
          <Skeleton className={"h-20 w-full"} />
          <Skeleton className={"h-16 w-full"} />
          <Skeleton className={"h-20 w-full"} />
          <Skeleton className={"h-40 w-full"} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectCardLoading;
