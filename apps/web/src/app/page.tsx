import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@repo/ui/components/button';
import { Skeleton } from '@repo/ui/components/skeleton';
import { FeaturedProducts } from '@/components/featured-products';
import { PromoBanner } from '@/components/promo-banner';

// Page Metadata
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  openGraph: {
    title: 'Vercel Swag Store',
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  },
};

// Skeletons
function PromoBannerSkeleton() {
  return (
    <div className="border-b border-border bg-secondary py-3">
      <div className="mx-auto flex max-w-7xl justify-center px-4">
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Hero Visual
function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-12">
      {/* Glow */}
      <div
        className="absolute h-72 w-72 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      {/* Large triangle */}
      <svg
        viewBox="0 0 76 65"
        className="relative h-52 w-52 text-foreground/[0.07]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
      {/* Top-left small */}
      <svg
        viewBox="0 0 76 65"
        className="absolute left-8 top-8 h-11 w-11 text-foreground/5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
      {/* Bottom-right tiny */}
      <svg
        viewBox="0 0 76 65"
        className="absolute bottom-8 right-8 h-7 w-7 text-foreground/4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
    </div>
  );
}

// Home Page
export default function HomePage() {
  return (
    <>
      {/* Promo Banner */}
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromoBanner />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section
          className="grid min-h-110 grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24"
          aria-label="Hero"
        >
          {/* Text */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Ship Fast.
                <br />
                Look Good.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                Official Vercel merchandise for developers who move fast and
                ship things. Premium quality gear you&apos;ll actually want to
                wear.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/search">Shop All Products</Link>
              </Button>
            </div>
          </div>

          {/* Decorative visual */}
          <div className="hidden lg:block" aria-hidden="true">
            <HeroVisual />
          </div>
        </section>

        {/* Featured Products */}
        <section className="pb-20 pt-4" aria-label="Featured Products">
          <Suspense
            fallback={
              <>
                <div className="mb-8 flex items-end justify-between">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-52" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
                <ProductGridSkeleton />
              </>
            }
          >
            <FeaturedProducts />
          </Suspense>
        </section>
      </div>
    </>
  );
}
