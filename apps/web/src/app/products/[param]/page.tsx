import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { Suspense } from 'react';
import { getProduct, getProductStock, getProducts } from '@/lib/api';
import { ProductContent } from './product-content';
import { StockSection, StockSectionSkeleton } from './stock-section';

interface Params {
  param: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const { data: products } = await getProducts({ limit: 100 });
    return products.map((product) => ({ param: product.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { param } = await params;
  const result = await getCachedProduct(param);

  if (!result) {
    return { title: 'Product Not Found' };
  }

  const { data: product } = result;
  const ogImage = product.images[0]
    ? {
        url: product.images[0],
        width: 1200,
        height: 630,
        alt: product.name,
      }
    : undefined;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: 'article',
      title: `${product.name} — Vercel Swag Store`,
      description: product.description,
      url: `/products/${product.slug}`,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Vercel Swag Store`,
      description: product.description,
      ...(product.images[0] && { images: [product.images[0]] }),
    },
  };
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
  'use cache: remote';
  cacheLife('hours');
  try {
    return await getProduct(slug);
  } catch {
    return null;
  }
}
