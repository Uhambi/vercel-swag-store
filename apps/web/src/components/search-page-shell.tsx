'use client';

import type { ReactNode } from 'react';
import { useRouterTransition } from '@/components/router-transition-provider';
import { SearchForm } from '@/components/search-form';
import type { Category } from '@/lib/types';

interface SearchPageShellProps {
  categories: Category[];
  children: ReactNode;
}

export function SearchPageShell({
  categories,
  children,
}: SearchPageShellProps) {
  const { isPending, navigate } = useRouterTransition();

  return (
    <>
      <div className="mb-8">
        <SearchForm
          categories={categories}
          isPending={isPending}
          navigate={navigate}
        />
      </div>
      <div
        className={`transition-opacity duration-200 ${isPending ? 'pointer-events-none opacity-50' : ''}`}
      >
        {children}
      </div>
    </>
  );
}
