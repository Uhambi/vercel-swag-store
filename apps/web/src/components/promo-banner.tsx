'use cache';

import { Tag } from 'lucide-react';
import { cacheLife } from 'next/cache';
import { getPromotion } from '@/lib/api';
import type { Promotion } from '@/lib/types';

export async function PromoBanner() {
  cacheLife('minutes');

  let promo: Promotion;
  try {
    const result = await getPromotion();
    promo = result.data;
  } catch {
    return null;
  }

  if (!promo.active) {
    return null;
  }

  return (
    <div className="border-border border-b bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center sm:px-6 lg:px-8">
        {/* Title */}
        <span className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
          <Tag aria-hidden="true" className="size-3.5 shrink-0" />
          {promo.title}
        </span>

        {/* Divider */}
        <span
          aria-hidden="true"
          className="hidden text-muted-foreground sm:inline"
        >
          ·
        </span>

        {/* Description */}
        <span className="text-muted-foreground text-sm">
          {promo.description}
        </span>

        {/* Promo code */}
        <span className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">Code:</span>
          <code className="rounded bg-background/60 px-2 py-0.5 font-bold font-mono text-foreground text-xs tracking-wider ring-1 ring-border">
            {promo.code}
          </code>
        </span>
      </div>
    </div>
  );
}
