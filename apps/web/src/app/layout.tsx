import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { RouterTransitionProvider } from '@/components/router-transition-provider';
import { ThemeContextProvider } from '@/components/theme-provider';
import './globals.css';

// Viewport & Theme
export const viewport: Viewport = {
  themeColor: '#171719',
  width: 'device-width',
  initialScale: 1,
};

// Root Metadata
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://swag.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vercel Swag Store',
    template: '%s | Vercel Swag Store',
  },
  description:
    'Official Vercel merchandise. Premium developer apparel, accessories, and gear. Built with Next.js.',
  keywords: [
    'Vercel',
    'swag',
    'merchandise',
    'developer',
    'apparel',
    'Next.js',
    't-shirts',
    'hoodies',
    'accessories',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Vercel Swag Store',
    title: {
      default: 'Vercel Swag Store',
      template: '%s | Vercel Swag Store',
    },
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
    url: SITE_URL,
    locale: 'en_US',
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
    title: {
      default: 'Vercel Swag Store',
      template: '%s | Vercel Swag Store',
    },
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
    creator: '@vercel',
    site: '@vercel',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Layout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${GeistSans.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <ThemeContextProvider>
          <RouterTransitionProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </RouterTransitionProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
