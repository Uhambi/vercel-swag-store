'use server';

import { updateTag } from 'next/cache';
import { addToCart, removeCartItem, updateCartItem } from '@/lib/api';
import { ensureCart, getCartToken } from '@/lib/cart';

// Errors logging is handled in the api layer

export async function addItemAction(productId: string, quantity: number) {
  try {
    const token = await ensureCart();
    await addToCart(token, productId, quantity);
    updateTag('cart');
  } catch {
    // failed to add item
  }
}

export async function updateItemAction(itemId: string, quantity: number) {
  const token = await getCartToken();
  if (!token) {
    return;
  }
  try {
    await updateCartItem(token, itemId, quantity);
    updateTag('cart');
  } catch {
    // failed to update item
  }
}

export async function removeItemAction(itemId: string) {
  const token = await getCartToken();
  if (!token) {
    return;
  }
  try {
    await removeCartItem(token, itemId);
    updateTag('cart');
  } catch {
    // failed to remove item
  }
}
