'use client';

import { useCallback, useTransition } from 'react';
import type { Cart } from '@/lib/types';
import { useCartStore } from '@/store/cart';

export function useCartAction() {
  const [isPending, startTransition] = useTransition();
  const setCart = useCartStore((s) => s.setCart);

  const execute = useCallback(
    (action: () => Promise<Cart | null>) => {
      startTransition(async () => {
        const cart = await action();
        if (cart) {
          setCart(cart);
        }
      });
    },
    [setCart],
  );

  return { isPending, execute };
}
