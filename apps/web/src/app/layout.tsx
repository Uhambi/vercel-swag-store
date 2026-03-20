import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vercel Swag Store",
  description: "Next.js 16 storefront demonstrating modern React patterns, caching strategies, and server-side architecture on Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4 py-8">
        {children}
      </body>
    </html>
  );
}
