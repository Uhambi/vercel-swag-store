'use cache';

import { cacheLife } from 'next/cache';
import { getPromotion } from '@/lib/api';
import { Tag } from 'lucide-react';

export async function PromoBanner() {
  cacheLife('minutes');

  let promo;
  try {
    const result = await getPromotion();
    promo = result.data;
  } catch {
    return null;
  }

  if (!promo.active) return null;

  return (
    <div className="border-b border-border bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center sm:px-6 lg:px-8">
        {/* Title */}
        <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Tag className="size-3.5 shrink-0" aria-hidden="true" />
          {promo.title}
        </span>

        {/* Divider */}
        <span className="hidden text-muted-foreground sm:inline" aria-hidden="true">·</span>

        {/* Description */}
        <span className="text-sm text-muted-foreground">{promo.description}</span>

        {/* Promo code */}
        <span className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">Code:</span>
          <code className="rounded bg-background/60 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-foreground ring-1 ring-border">
            {promo.code}
          </code>
        </span>
      </div>
    </div>
  );
}

