import { PageContainer } from "..";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <PageContainer>
      <Skeleton className={"h-20 w-1/2"} />
      <div className="flex gap-4 flex-col w-full items-start mt-8">
        <Skeleton className={"h-20 w-full"} />
      </div>
    </PageContainer>
  );
};

export default TableSkeleton;
