'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { MouseEvent } from 'react';

export interface PaginationProps {
  currentPage: number;
  onNavigate?: (href: string) => void;
  searchParams: { category?: string; q?: string };
  totalPages: number;
}

function buildHref(
  page: number,
  searchParams: PaginationProps['searchParams'],
): string {
  const params = new URLSearchParams();
  if (searchParams.q) {
    params.set('q', searchParams.q);
  }
  if (searchParams.category) {
    params.set('category', searchParams.category);
  }
  if (page > 1) {
    params.set('page', String(page));
  }
  const qs = params.toString();
  return `/search${qs ? `?${qs}` : ''}`;
}

function getPageNumbers(
  current: number,
  total: number,
): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Set<number> = new Set();
  pages.add(1);
  pages.add(total);

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.add(i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i];
    const prev = sorted[i - 1];

    if (page === undefined) {
      continue;
    }

    if (prev !== undefined && page - prev > 1) {
      result.push('ellipsis');
    }
    result.push(page);
  }

  return result;
}

const baseBtn =
  'inline-flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors';
const activeBtn = 'border-primary bg-primary text-primary-foreground';
const clickableBtn =
  'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer';
const disabledBtn =
  'border-border bg-card text-muted-foreground/40 pointer-events-none';

export function Pagination({
  currentPage,
  onNavigate,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  function handleClick(e: MouseEvent, href: string) {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-1.5">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link
            aria-label="Previous page"
            className={`${baseBtn} ${clickableBtn}`}
            href={buildHref(currentPage - 1, searchParams)}
            onClick={(e) =>
              handleClick(e, buildHref(currentPage - 1, searchParams))
            }
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span aria-disabled="true" className={`${baseBtn} ${disabledBtn}`}>
            <ChevronLeft className="size-4" />
          </span>
        )}

        {/* Page numbers */}
        {pages.map((page, idx) => {
          if (page === 'ellipsis') {
            return (
              <span
                className="inline-flex size-9 items-center justify-center text-muted-foreground text-sm"
                key={`ellipsis-${idx.toString()}`}
              >
                …
              </span>
            );
          }

          if (page === currentPage) {
            return (
              <span
                aria-current="page"
                className={`${baseBtn} ${activeBtn}`}
                key={page}
              >
                {page}
              </span>
            );
          }

          return (
            <Link
              className={`${baseBtn} ${clickableBtn}`}
              href={buildHref(page, searchParams)}
              key={page}
              onClick={(e) =>
                handleClick(e, buildHref(page, searchParams))
              }
            >
              {page}
            </Link>
          );
        })}

        {/* Next */}
        {currentPage < totalPages ? (
          <Link
            aria-label="Next page"
            className={`${baseBtn} ${clickableBtn}`}
            href={buildHref(currentPage + 1, searchParams)}
            onClick={(e) =>
              handleClick(e, buildHref(currentPage + 1, searchParams))
            }
          >
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span aria-disabled="true" className={`${baseBtn} ${disabledBtn}`}>
            <ChevronRight className="size-4" />
          </span>
        )}
      </div>

      {/* Page info */}
      <p className="text-muted-foreground text-xs">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
}
