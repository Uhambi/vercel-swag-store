'use client';

import { useEffect } from 'react';
import type { Cart } from '@/lib/types';
import { useCartStore } from '@/store/cart';

interface CartStoreInitializerProps {
  initialCart: Cart | null;
}

export function CartStoreInitializer({
  initialCart,
}: CartStoreInitializerProps) {
  const initialize = useCartStore((s) => s.initialize);

  useEffect(() => {
    initialize(initialCart);
  }, [initialize, initialCart]);

  return null;
}
