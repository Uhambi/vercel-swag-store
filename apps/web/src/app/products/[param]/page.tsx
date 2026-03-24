import { Skeleton } from '@repo/ui/components/skeleton';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { AddToCartForm } from '@/components/add-to-cart-form';
import { StockIndicator } from '@/components/stock-indicator';
import { formatPrice, getProduct, getProductStock } from '@/lib/api';
import type { Product } from '@/lib/types';

// Page Types
interface Params {
  param: string;
}

// Cached product fetch
async function getCachedProduct(slug: string) {
  'use cache';
  cacheLife('hours');
  return getProduct(slug);
}

// Page Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { param } = await params;

  try {
    const { data: product } = await getCachedProduct(param);
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

// Skeletons
function StockSkeleton() {
  return <Skeleton className="h-6 w-28" />;
}

// Stock section
async function StockSection({
  slug,
  productId,
}: {
  slug: string;
  productId: string;
}) {
  const { data: stock } = await getProductStock(slug);
  return (
    <div className="flex flex-col gap-3">
      <StockIndicator slug={slug} />
      <AddToCartForm
        inStock={stock.inStock}
        productId={productId}
        stock={stock.stock}
      />
    </div>
  );
}

// Product Detail Page
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  'use cache';
  cacheLife('hours');

  const { param } = await params;

  let product: Product;
  try {
    const res = await getCachedProduct(param);
    product = res.data;
  } catch {
    notFound();
  }

  const image = product.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        className="mb-8 inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="/search"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — Image */}
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

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
              {product.category}
            </p>
            <h1 className="font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="font-semibold text-2xl text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Stock + Add to Cart */}
          <Suspense
            fallback={
              <div className="flex flex-col gap-4">
                <StockSkeleton />
                <Skeleton className="h-11 w-full" />
              </div>
            }
          >
            <StockSection productId={product.id} slug={param} />
          </Suspense>

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
