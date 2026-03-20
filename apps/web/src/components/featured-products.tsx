'use cache';

import { cacheLife } from 'next/cache';
import { getProducts } from '@/lib/api';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

export async function FeaturedProducts() {
  cacheLife('hours');

  const { data: products } = await getProducts({ featured: 'true', limit: 6 });

  if (products.length === 0) return null;

  return (
    <section>
      {/* Section header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Handpicked Vercel gear for developers
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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

