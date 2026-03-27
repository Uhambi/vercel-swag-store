import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';
import { createCart, getCart } from '@/lib/api';
import type { ApiResponse, Cart } from '@/lib/types';

export async function getCartToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('cart-token')?.value;
}

export async function ensureCart(): Promise<string> {
  const existing = await getCartToken();
  if (existing) {
    return existing;
  }

  const { token } = await createCart();
  const cookieStore = await cookies();
  cookieStore.set('cart-token', token, {
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 86_400, // 24 h (matches API expiry)
    path: '/',
  });

  return token;
}

export async function getCachedCart(token: string): Promise<ApiResponse<Cart>> {
  'use cache';
  cacheTag('cart');
  cacheLife('minutes');
  return await getCart(token);
}
