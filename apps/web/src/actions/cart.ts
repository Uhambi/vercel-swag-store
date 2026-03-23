'use server';

import { cookies } from 'next/headers';
import {
  addToCart,
  createCart,
  removeCartItem,
  updateCartItem,
} from '@/lib/api';

// Helpers
async function getCartToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('cart-token')?.value;
}

async function ensureCart(): Promise<string> {
  const existing = await getCartToken();
  if (existing) return existing;

  const { token } = await createCart();
  const cookieStore = await cookies();
  cookieStore.set('cart-token', token, {
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 86_400, // 24 h — matches API expiry
    path: '/',
  });

  return token;
}

// Actions
export async function addItemAction(productId: string, quantity: number) {
  const token = await ensureCart();
  await addToCart(token, productId, quantity);
}

export async function updateItemAction(itemId: string, quantity: number) {
  const token = await getCartToken();
  if (!token) return;
  await updateCartItem(token, itemId, quantity);
}

export async function removeItemAction(itemId: string) {
  const token = await getCartToken();
  if (!token) return;
  await removeCartItem(token, itemId);
}
