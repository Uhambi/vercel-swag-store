'use client';

import { RotateCcw, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import type { Category } from '@/lib/types';

interface SearchFormProps {
  categories: Category[];
  isPending?: boolean;
  navigate?: (url: string, options?: { scroll?: boolean }) => void;
}

export function SearchForm({
  categories,
  isPending: isPendingProp,
  navigate: navigateProp,
}: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ownPending, startTransition] = useTransition();

  const isPending = isPendingProp ?? ownPending;

  function navigate(url: string, opts?: { scroll?: boolean }) {
    if (navigateProp) {
      navigateProp(url, opts);
    } else {
      startTransition(() => {
        router.push(url, opts);
      });
    }
  }

  const currentQuery = searchParams.get('q') ?? '';
  const currentCategory = searchParams.get('category') ?? '';

  const [query, setQuery] = useState(currentQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  function buildAndNavigate(q: string, category: string) {
    const params = new URLSearchParams();
    if (q.trim()) {
      params.set('q', q.trim());
    }
    if (category) {
      params.set('category', category);
    }
    const qs = params.toString();
    navigate(`/search${qs ? `?${qs}` : ''}`, { scroll: false });
  }

  function cancelDebounce() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    cancelDebounce();

    if (value.trim().length >= 3) {
      debounceRef.current = setTimeout(() => {
        buildAndNavigate(value, currentCategory);
      }, 300);
    } else if (value.trim().length === 0 && currentQuery) {
      debounceRef.current = setTimeout(() => {
        buildAndNavigate('', currentCategory);
      }, 300);
    }
  }

  function handleCategoryChange(category: string) {
    cancelDebounce();
    buildAndNavigate(query, category);
  }

  function handleClear() {
    cancelDebounce();
    setQuery('');
    navigate('/search', { scroll: false });
  }

  useEffect(() => {
    const ref = debounceRef;
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = null;
      }
    };
  }, []);

  const hasActiveFilters =
    Boolean(currentQuery) ||
    Boolean(currentCategory) ||
    Boolean(searchParams.get('page'));

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          aria-label="Search products"
          className="h-10 w-full rounded-lg border border-border bg-card pr-4 pl-9 text-foreground text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search products..."
          type="text"
          value={query}
        />
      </div>

      {/* Category Select */}
      <select
        aria-label="Filter by category"
        className="h-10 cursor-pointer rounded-lg border border-border bg-card px-3 text-foreground text-sm focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:w-48"
        onChange={(e) => handleCategoryChange(e.target.value)}
        value={currentCategory}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name} ({cat.productCount})
          </option>
        ))}
      </select>

      {/* Clear Button */}
      <button
        className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        disabled={!hasActiveFilters || isPending}
        onClick={handleClear}
        type="button"
      >
        <RotateCcw className="size-3.5" />
        Clear
      </button>
    </div>
  );
}
