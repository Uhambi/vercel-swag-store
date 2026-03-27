import { Skeleton } from '@repo/ui/components/skeleton';

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="overflow-hidden rounded-xl border border-border bg-card"
          key={`skeleton-${i.toString()}`}
        >
          <Skeleton className="aspect-square w-full" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PageContentSkeleton() {
  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 sm:w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <ProductGridSkeleton />
    </>
  );
}

