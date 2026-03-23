import { Skeleton } from '@repo/ui/components/skeleton';

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-5 w-36" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="flex flex-col gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    </div>
  );
}

