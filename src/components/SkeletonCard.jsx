import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/pages";

export function SkeletonCard({ style }) {
  return (
    <PageContainer>
      <div className="space-y-3 w-full">
        <Skeleton className={cn("h-[125px] w-[250px] rounded-xl", style)} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </PageContainer>
  );
}
