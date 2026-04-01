'use server';

import { addToCart, removeCartItem, updateCartItem } from '@/lib/api';
import { ensureCart, getCartToken } from '@/lib/cart';
import type { Cart } from '@/lib/types';

export async function addItemAction(
  productId: string,
  quantity: number,
): Promise<Cart | null> {
  try {
    const token = await ensureCart();
    const { data } = await addToCart(token, productId, quantity);
    return data;
  } catch {
    return null;
  }
}

export async function updateItemAction(
  itemId: string,
  quantity: number,
): Promise<Cart | null> {
  const token = await getCartToken();
  if (!token) {
    return null;
  }
  try {
    const { data } = await updateCartItem(token, itemId, quantity);
    return data;
  } catch {
    return null;
  }
}

export async function removeItemAction(itemId: string): Promise<Cart | null> {
  const token = await getCartToken();
  if (!token) {
    return null;
  }
  try {
    const { data } = await removeCartItem(token, itemId);
    return data;
  } catch {
    return null;
  }
}
