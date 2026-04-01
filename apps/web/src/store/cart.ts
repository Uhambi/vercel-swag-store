import { create } from 'zustand';
import type { Cart } from '@/lib/types';

interface CartState {
  cart: Cart | null;
  initialize: (cart: Cart | null) => void;
  setCart: (cart: Cart) => void;
  status: 'loading' | 'ready';
}

export const useCartStore = create<CartState>()((set) => ({
  cart: null,
  status: 'loading',
  initialize: (cart) => set({ cart, status: 'ready' }),
  setCart: (cart) => set({ cart }),
}));
