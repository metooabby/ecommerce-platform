import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white space-y-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />

      <div className="space-y-2 mt-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
