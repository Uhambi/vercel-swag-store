import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { MobileMenu } from '@/components/mobile-menu';
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

// Nav Link
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
      href={href}
    >
      {children}
    </Link>
  );
}

// Cart Icon
function CartIcon({ count }: { count: number }) {
  return (
    <Link
      aria-label={
        count > 0 ? `Cart — ${count} item${count === 1 ? '' : 's'}` : 'Cart'
      }
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      href="/cart"
    >
      <span className="relative block">
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary font-bold text-[10px] text-primary-foreground leading-none">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    </Link>
  );
}

// Cart Count
async function CartCount() {
  try {
    const token = await getCartToken();
    if (!token) {
      return <CartIcon count={0} />;
    }
    const { data } = await getCart(token);
    return <CartIcon count={data.totalItems} />;
  } catch {
    return <CartIcon count={0} />;
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
            className="flex items-center gap-2.5 font-semibold text-foreground transition-opacity hover:opacity-80"
            href="/"
          >
            <VercelLogo className="size-4.5" />
            <span className="text-sm">Swag Store</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center md:flex"
          >
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Search</NavLink>
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Theme + Cart + Mobile menu */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Suspense fallback={<CartIcon count={0} />}>
            <CartCount />
          </Suspense>
          <Suspense>
            <MobileMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
