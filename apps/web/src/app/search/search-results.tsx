import { cacheLife } from 'next/cache';
import { ProductCard } from '@/components/product-card';
import { TransitionPagination } from '@/components/transition-pagination';
import { getProducts } from '@/lib/api';
import type { PaginationMeta, Product, ProductListParams } from '@/lib/types';
import { SearchEmptyState } from './empty-state';
import { ResultSummary } from './result-summary';

const DEFAULT_LIMIT = 12;
const SEARCH_LIMIT = 5;

export async function SearchResults({
  q,
  category,
  page,
}: {
  q: string;
  category: string;
  page: number;
}) {
  'use cache';
  cacheLife('minutes');

  const isSearching = Boolean(q) || Boolean(category);
  const limit = isSearching ? SEARCH_LIMIT : DEFAULT_LIMIT;

  let products: Product[];
  let pagination: PaginationMeta;
  try {
    const { data, meta } = await getProducts({
      ...(q ? { search: q } : {}),
      ...(category
        ? { category: category as ProductListParams['category'] }
        : {}),
      limit,
      page,
    });
    products = data;
    pagination = meta.pagination;
  } catch {
    return (
      <p className="py-10 text-center text-muted-foreground text-sm">
        Failed to load products. Please try again later.
      </p>
    );
  }

  if (products.length === 0) {
    return <SearchEmptyState category={category} q={q} />;
  }

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
