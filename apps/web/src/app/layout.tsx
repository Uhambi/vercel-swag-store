import { GeistMono } from 'geist/font/mono';
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
export const metadata: Metadata = {
  title: {
    default: 'Vercel Swag Store',
    template: '%s | Vercel Swag Store',
  },
  description:
    'Official Vercel merchandise. Premium developer apparel, accessories, and gear. Built with Next.js.',
  openGraph: {
    type: 'website',
    siteName: 'Vercel Swag Store',
    title: 'Vercel Swag Store',
    description:
      'Official Vercel merchandise. Premium developer apparel, accessories, and gear.',
  },
};

// Layout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
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
