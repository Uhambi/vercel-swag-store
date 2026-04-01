import type { Metadata } from 'next';
import { CartPageClient } from './cart-page-client';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your Vercel swag selections and proceed to checkout.',
  openGraph: {
    title: 'Your Cart - Vercel Swag Store',
    description: 'Review your Vercel swag selections and proceed to checkout.',
    url: '/cart',
  },
  twitter: {
    card: 'summary',
    title: 'Your Cart - Vercel Swag Store',
    description: 'Review your Vercel swag selections and proceed to checkout.',
  },
  robots: { index: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
