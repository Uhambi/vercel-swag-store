import { ArrowLeft } from 'lucide-react';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getProduct } from '@/lib/api';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';

export async function ProductContent({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  'use cache: remote';
  cacheLife('hours');

  let product: Product;
  try {
    const { data } = await getProduct(slug);
    product = data;
  } catch {
    notFound();
  }

  const image = product.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        className="mb-8 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="/search"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left - Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card">
          {image ? (
            <Image
              alt={product.name}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={image}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
              {product.category}
            </p>
            <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="font-semibold text-2xl text-foreground">
              {formatPrice(product.price, product.currency)}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Stock + Add to Cart - dynamic, never cached */}
          {children}

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-border border-t pt-6">
              {product.tags.map((tag) => (
                <span
                  className="rounded-full border border-border px-3 py-1 text-muted-foreground text-xs"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
