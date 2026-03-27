'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mt-4 font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or return to the
        homepage.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          className="inline-flex h-10 cursor-pointer items-center rounded-lg bg-primary px-5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-90"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
        <Link
          className="inline-flex h-10 items-center rounded-lg border border-border px-5 font-medium text-foreground text-sm transition-colors hover:bg-accent"
          href="/"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
