import type { Metadata } from 'next';
import { Suspense } from 'react';
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from './featured-products';
import { Hero } from './hero';
import { PromoBanner, PromoBannerSkeleton } from './promo-banner';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  openGraph: {
    title: 'Vercel Swag Store — Official Developer Merch',
    description:
      'Shop premium developer apparel, drinkware, accessories, and gear from Vercel. Rep your favorite framework.',
    url: '/',
    images: [
      {
        url: '/vercel.svg',
        width: 1200,
        height: 630,
        alt: 'Vercel Swag Store — Official developer merchandise',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vercel Swag Store — Official Developer Merch',
    description:
      'Shop premium developer apparel, drinkware, accessories, and gear from Vercel.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Promo Banner */}
      <Suspense fallback={<PromoBannerSkeleton />}>
        <PromoBanner />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <Hero />

        {/* Featured Products */}
        <section aria-label="Featured Products" className="pt-4 pb-20">
          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </section>
      </div>
    </>
  );
}
