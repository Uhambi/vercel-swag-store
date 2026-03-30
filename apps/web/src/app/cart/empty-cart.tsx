import { Button } from '@repo/ui/components/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex size-16 items-center justify-center rounded-full bg-card">
        <ShoppingBag className="size-8 text-muted-foreground" />
      </div>
      <h1 className="mt-6 font-bold text-2xl text-foreground">
        Your cart is empty
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        Looks like you haven&apos;t added any items yet.
      </p>
      <Button asChild className="mt-6" size="lg">
        <Link href="/search">Browse Products</Link>
      </Button>
    </div>
  );
}
