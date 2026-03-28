'use client';

import type { ReactNode } from 'react';
import { useRouterTransition } from '@/components/router-transition-provider';
import type { Category } from '@/lib/types';
import { SearchForm } from './search-form';

interface SearchShellClientProps {
  categories: Category[];
  children: ReactNode;
}

export function SearchShellClient({
  categories,
  children,
}: SearchShellClientProps) {
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
