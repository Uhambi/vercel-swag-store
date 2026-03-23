import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { cacheLife } from 'next/cache';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@repo/ui/components/skeleton';
import { formatPrice, getProduct, getProductStock } from '@/lib/api';
import { StockIndicator } from '@/components/stock-indicator';
import { AddToCartForm } from '@/components/add-to-cart-form';

// Page Types
type Params = { param: string };

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
async function StockSection({ slug, productId }: { slug: string; productId: string }) {
  const { data: stock } = await getProductStock(slug);
  return (
    <div className="flex flex-col gap-3">
      <StockIndicator slug={slug} />
      <AddToCartForm
        productId={productId}
        inStock={stock.inStock}
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

  let product;
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
        href="/search"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
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
              src={image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="leading-relaxed text-muted-foreground">
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
            <StockSection slug={param} productId={product.id} />
          </Suspense>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-border pt-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
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
