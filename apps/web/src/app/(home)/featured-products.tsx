import { Skeleton } from '@repo/ui/components/skeleton';
import { cacheLife } from 'next/cache';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';

export async function FeaturedProducts() {
  'use cache';
  cacheLife('minutes');

  let products: Product[];
  try {
    const { data } = await getProducts({ featured: 'true', limit: 6 });
    products = data;
  } catch {
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Handpicked Vercel gear for developers
          </p>
        </div>
        <Link
          className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/search"
        >
          View all →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <>
      <div className="mb-8 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
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
    </>
  );
}
