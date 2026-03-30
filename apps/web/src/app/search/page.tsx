import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchResults } from './search-results';
import { SearchShell } from './search-shell';
import { PageContentSkeleton, ProductGridSkeleton } from './skeletons';

interface SearchParams
  extends Promise<Record<string, string | string[] | undefined>> {}

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Browse and search the full collection of Vercel swag — apparel, drinkware, accessories, and more.',
  openGraph: {
    title: 'Browse Products — Vercel Swag Store',
    description:
      'Search and filter the full collection of Vercel developer merchandise.',
    url: '/search',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse Products — Vercel Swag Store',
    description:
      'Search and filter the full collection of Vercel developer merchandise.',
  },
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
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
        <SearchShell>
          <Suspense fallback={<ProductGridSkeleton />}>
            <SearchContent searchParams={searchParams} />
          </Suspense>
        </SearchShell>
      </Suspense>
    </div>
  );
}

async function SearchContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const category = typeof params.category === 'string' ? params.category : '';
  const pageStr = typeof params.page === 'string' ? params.page : '1';
  const page = Math.max(1, Number.parseInt(pageStr, 10) || 1);

  return <SearchResults category={category} page={page} q={q} />;
}
