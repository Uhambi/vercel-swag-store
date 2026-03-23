import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Your Cart' };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
      <p className="mt-2 text-muted-foreground">Cart page coming soon.</p>
    </div>
  );
}

