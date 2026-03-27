import { cacheLife } from 'next/cache';
import type { ReactNode } from 'react';
import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/types';
import { SearchShellClient } from './search-shell-client';

export async function SearchShell({ children }: { children: ReactNode }) {
  let categories: Category[] = [];
  try {
    const { data } = await getCachedCategories();
    categories = data;
  } catch {
    // fall back to empty categories on error
  }
  return (
    <SearchShellClient categories={categories}>{children}</SearchShellClient>
  );
}

async function getCachedCategories() {
  'use cache';
  cacheLife('hours');
  return await getCategories();
}
