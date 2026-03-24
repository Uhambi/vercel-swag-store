import { Button } from '@repo/ui/components/button';
import { Skeleton } from '@repo/ui/components/skeleton';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
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
    <div className="border-border border-b bg-secondary py-3">
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
          className="overflow-hidden rounded-xl border border-border bg-card"
          key={`skeleton-${i.toString()}`}
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
      <div
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full bg-foreground/5 blur-3xl"
      />
      <svg
        aria-hidden="true"
        className="relative h-52 w-52 text-foreground/[0.07]"
        fill="currentColor"
        viewBox="0 0 76 65"
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute top-8 left-8 h-11 w-11 text-foreground/5"
        fill="currentColor"
        viewBox="0 0 76 65"
      >
        <path d="M37.59.25l36.95 64H.64l36.95-64z" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute right-8 bottom-8 h-7 w-7 text-foreground/4"
        fill="currentColor"
        viewBox="0 0 76 65"
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
          aria-label="Hero"
          className="grid min-h-110 grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24"
        >
          {/* Text */}
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-5xl text-foreground tracking-tight sm:text-6xl lg:text-7xl">
                Ship Fast.
                <br />
                Look Good.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
                Official Vercel merchandise for developers who move fast and
                ship things. Premium quality gear you&apos;ll actually want to
                wear.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-full sm:w-auto" size="lg">
                <Link href="/search">Shop All Products</Link>
              </Button>
            </div>
          </div>

          {/* Decorative visual */}
          <div aria-hidden="true" className="hidden lg:block">
            <HeroVisual />
          </div>
        </section>

        {/* Featured Products */}
        <section aria-label="Featured Products" className="pt-4 pb-20">
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
