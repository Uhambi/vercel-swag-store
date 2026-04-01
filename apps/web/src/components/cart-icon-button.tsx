'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export function CartIconButton() {
  const count = useCartStore((s) => s.cart?.totalItems ?? 0);

  return (
    <Link
      aria-label={
        count > 0 ? `Cart - ${count} item${count === 1 ? '' : 's'}` : 'Cart'
      }
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
      href="/cart"
    >
      <span className="relative block">
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[10px] text-primary-foreground leading-none">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    </Link>
  );
}

