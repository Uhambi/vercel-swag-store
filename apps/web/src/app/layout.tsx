import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
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
  }
};

// Layout
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
