import { Button } from '@repo/ui/components/button';
import type { Metadata } from 'next';
import Link from 'next/link';
import { formatPrice } from '@/lib/api';
import { getCachedCart, getCartToken } from '@/lib/cart';
import type { Cart } from '@/lib/types';
import { CartItem } from './cart-item';
import EmptyCart from './empty-cart';

export const metadata: Metadata = { title: 'Your Cart' };

export default async function CartPage() {
  const token = await getCartToken();

  if (!token) {
    return <EmptyCart />;
  }

  let cart: Cart | null = null;
  try {
    const response = await getCachedCart(token);
    cart = response.data;
  } catch {
    // Token expired or invalid
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl text-foreground">Your Cart</h1>
      <p className="mt-1 text-muted-foreground text-sm">
        {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}
      </p>

      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Items List */}
        <section className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <CartItem item={item} key={item.productId} />
            ))}
          </div>
        </section>

        {/* Order Summary */}
        <aside className="mt-8 lg:col-span-5 lg:mt-0">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground text-lg">
              Order Summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground text-sm">Subtotal</dt>
                <dd className="font-medium text-foreground text-sm tabular-nums">
                  {formatPrice(cart.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground text-sm">Shipping</dt>
                <dd className="text-muted-foreground text-sm">
                  Calculated at checkout
                </dd>
              </div>
              <div className="border-border border-t pt-4">
                <div className="flex items-center justify-between">
                  <dt className="font-semibold text-foreground">Total</dt>
                  <dd className="font-semibold text-foreground tabular-nums">
                    {formatPrice(cart.subtotal)}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full" disabled size="lg">
                Checkout
              </Button>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link href="/search">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
