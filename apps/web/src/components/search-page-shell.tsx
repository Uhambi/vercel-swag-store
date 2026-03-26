'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useTransition } from 'react';
import { NavigationTransitionProvider } from '@/components/navigation-context';
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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (url: string, opts?: { scroll?: boolean }) => {
      startTransition(() => {
        router.push(url, opts);
      });
    },
    [router],
  );

  return (
    <NavigationTransitionProvider value={{ isPending, navigate }}>
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
    </NavigationTransitionProvider>
  );
}
