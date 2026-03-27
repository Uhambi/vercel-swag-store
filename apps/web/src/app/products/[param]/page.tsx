import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';
import { getProduct, getProductStock } from '@/lib/api';
import { ProductContent } from './product-content';
import { StockSection, StockSectionSkeleton } from './stock-section';

interface Params {
  param: string;
}

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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { param } = await params;
  const stockPromise = getProductStock(param);

  return (
    <ProductContent slug={param}>
      <Suspense fallback={<StockSectionSkeleton />}>
        <StockSection stockPromise={stockPromise} />
      </Suspense>
    </ProductContent>
  );
}

async function getCachedProduct(slug: string) {
  'use cache';
  cacheLife('hours');
  return getProduct(slug);
}
