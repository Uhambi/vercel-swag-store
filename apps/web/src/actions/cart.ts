'use server';

import { updateTag } from 'next/cache';
import { addToCart, removeCartItem, updateCartItem } from '@/lib/api';
import { ensureCart, getCartToken } from '@/lib/cart';

export async function addItemAction(productId: string, quantity: number) {
  const token = await ensureCart();
  await addToCart(token, productId, quantity);
  updateTag('cart');
}

export async function updateItemAction(itemId: string, quantity: number) {
  const token = await getCartToken();
  if (!token) {
    return;
  }
  await updateCartItem(token, itemId, quantity);
  updateTag('cart');
}

export async function removeItemAction(itemId: string) {
  const token = await getCartToken();
  if (!token) {
    return;
  }
  await removeCartItem(token, itemId);
  updateTag('cart');
}
