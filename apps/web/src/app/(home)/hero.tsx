import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

export function Hero() {
  return (
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
            Official Vercel merchandise for developers who move fast and ship
            things. Premium quality gear you&apos;ll actually want to wear.
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
      </div>
    </section>
  );
}
