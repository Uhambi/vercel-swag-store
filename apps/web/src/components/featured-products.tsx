'use cache';

import { cacheLife } from 'next/cache';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/api';

export async function FeaturedProducts() {
  cacheLife('hours');

  const { data: products } = await getProducts({ featured: 'true', limit: 6 });

  if (products.length === 0) {
    return null;
  }

  return (
    <section>
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Handpicked Vercel gear for developers
          </p>
        </div>
        <Link
          className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/search"
        >
          View all →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
