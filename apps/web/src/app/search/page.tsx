import { Skeleton } from '@repo/ui/components/skeleton';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';
import { TransitionPagination } from '@/components/transition-pagination';
import { ProductCard } from '@/components/product-card';
import { SearchPageShell } from '@/components/search-page-shell';
import { getCategories, getProducts } from '@/lib/api';
import type { ProductListParams } from '@/lib/types';

// Page Metadata
export const metadata: Metadata = { title: 'Search' };

const PRODUCTS_PER_PAGE = 12;

// Cached categories fetch
async function getCachedCategories() {
  'use cache';
  cacheLife('hours');
  return getCategories();
}

// Skeletons
function ProductGridSkeleton({
  count = PRODUCTS_PER_PAGE,
}: {
  count?: number;
}) {
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

function PageContentSkeleton() {
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

async function CategorySearchShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories } = await getCachedCategories();
  return <SearchPageShell categories={categories}>{children}</SearchPageShell>;
}

// Result Summary
function ResultSummary({
  startItem,
  endItem,
  total,
  q,
  category,
}: {
  startItem: number;
  endItem: number;
  total: number;
  q: string;
  category: string;
}) {
  const isSearching = Boolean(q) || Boolean(category);

  if (!isSearching) {
    return (
      <p className="mb-6 text-muted-foreground text-sm">
        Showing {startItem}–{endItem} of {total} products
      </p>
    );
  }

  return (
    <p className="mb-6 text-muted-foreground text-sm">
      Showing {startItem}–{endItem} of {total} result
      {total === 1 ? '' : 's'}
      {q ? <> for &ldquo;{q}&rdquo;</> : null}
      {category ? ` in ${category}` : ''}
    </p>
  );
}

// Search Results
async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const category = typeof params.category === 'string' ? params.category : '';
  const pageParam = typeof params.page === 'string' ? params.page : '1';
  const page = Math.max(1, Number.parseInt(pageParam, 10) || 1);

  const { data: products, meta } = await getProducts({
    ...(q ? { search: q } : {}),
    ...(category
      ? { category: category as ProductListParams['category'] }
      : {}),
    limit: PRODUCTS_PER_PAGE,
    page,
  });

  const { pagination } = meta;

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <span aria-label="No results" className="text-3xl" role="img">
            🔍
          </span>
        </div>
        <div>
          <h2 className="font-semibold text-foreground text-lg">
            No products found
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            {q ? (
              <>
                No results for &ldquo;{q}&rdquo;
                {category ? ` in ${category}` : ''}. Try a different search
                term.
              </>
            ) : (
              <>No products in this category.</>
            )}
          </p>
        </div>
      </div>
    );
  }

  // Results
  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = startItem + products.length - 1;

  return (
    <div>
      <ResultSummary
        category={category}
        endItem={endItem}
        q={q}
        startItem={startItem}
        total={pagination.total}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <TransitionPagination
        currentPage={pagination.page}
        searchParams={{ q: q || undefined, category: category || undefined }}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}

// Search Page
export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Static header */}
      <div className="mb-8">
        <h1 className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
          Browse Products
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Search and filter our collection of Vercel swag
        </p>
      </div>

      {/* Form + Results */}
      <Suspense fallback={<PageContentSkeleton />}>
        <CategorySearchShell>
          <Suspense fallback={<ProductGridSkeleton />}>
            <SearchResults searchParams={searchParams} />
          </Suspense>
        </CategorySearchShell>
      </Suspense>
    </div>
  );
}
