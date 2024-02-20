import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonCard({ style }) {
  return (
    <div className="space-y-3 w-full mt-6">
      <Skeleton className={cn("h-[125px] w-[250px] rounded-xl", style)} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
