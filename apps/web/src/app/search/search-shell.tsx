import { cacheLife } from 'next/cache';
import type { ReactNode } from 'react';
import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/types';
import { SearchShellClient } from './search-shell-client';

export async function SearchShell({ children }: { children: ReactNode }) {
  let categories: Category[] = [];
  const result = await getCachedCategories();

  if (result) {
    categories = result.data;
  }

  return (
    <SearchShellClient categories={categories}>{children}</SearchShellClient>
  );
}

async function getCachedCategories() {
  'use cache: remote';
  cacheLife('hours');
  try {
    return await getCategories();
  } catch {
    return null;
  }
}
