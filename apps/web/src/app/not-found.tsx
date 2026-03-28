import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mt-4 font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          className="inline-flex h-10 items-center rounded-lg bg-primary px-5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
          href="/"
        >
          Go home
        </Link>
        <Link
          className="inline-flex h-10 items-center rounded-lg border border-border px-5 font-medium text-foreground text-sm transition-colors hover:bg-accent"
          href="/search"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}
