import Link from 'next/link';
import { Suspense } from 'react';
import { CartIconButton } from '@/components/cart-icon-button';
import { CartStoreInitializer } from '@/components/cart-store-initializer';
import { MobileMenu } from '@/components/mobile-menu';
import { NavLink } from '@/components/nav-link';
import { ThemeToggle } from '@/components/theme-toggle';
import { getCart } from '@/lib/api';
import { getCartToken } from '@/lib/cart';

// Vercel Logo
function VercelLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 76 65"
    >
      <path d="M37.59.25l36.95 64H.64l36.95-64z" />
    </svg>
  );
}

// Nav link styles
const navLinkClass =
  'rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground data-active:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70';

// Cart init
async function CartFetcher() {
  try {
    const token = await getCartToken();
    if (!token) {
      return <CartStoreInitializer initialCart={null} />;
    }
    const { data } = await getCart(token);
    return <CartStoreInitializer initialCart={data} />;
  } catch {
    return <CartStoreInitializer initialCart={null} />;
  }
}

// Header
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-border border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2">
          <Link
            className="flex items-center gap-2.5 rounded-md font-semibold text-foreground transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
            href="/"
          >
            <VercelLogo className="size-4.5" />
            <span className="text-sm">Swag Store</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center md:flex"
          >
            <NavLink className={navLinkClass} href="/">
              Home
            </NavLink>
            <NavLink className={navLinkClass} href="/search">
              Search
            </NavLink>
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Theme + Cart + Mobile menu */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Suspense fallback={null}>
            <CartFetcher />
          </Suspense>
          <CartIconButton />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
