import { Button } from '@repo/ui/components/button';
import { Skeleton } from '@repo/ui/components/skeleton';
import { ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { CartItem } from '@/components/cart-item';
import { formatPrice, getCart } from '@/lib/api';
import { getCartToken } from '@/lib/cart';
import type { Cart } from '@/lib/types';

// Page Metadata
export const metadata: Metadata = { title: 'Your Cart' };

// Skeletons
function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="mt-2 h-4 w-20" />
      <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-lg" />
        </div>
        <div className="mt-8 lg:col-span-5 lg:mt-0">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Cart content
async function CartContent() {
  const token = await getCartToken();

  if (!token) {
    return <EmptyCart />;
  }

  let cart: Cart | null = null;
  try {
    const response = await getCart(token);
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

// Empty Cart
function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex size-16 items-center justify-center rounded-full bg-card">
        <ShoppingBag className="size-8 text-muted-foreground" />
      </div>
      <h1 className="mt-6 font-bold text-2xl text-foreground">
        Your cart is empty
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        Looks like you haven't added any items yet.
      </p>
      <Button asChild className="mt-6" size="lg">
        <Link href="/search">Browse Products</Link>
      </Button>
    </div>
  );
}

// Cart Page
export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}