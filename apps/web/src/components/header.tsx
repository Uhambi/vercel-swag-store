import { getCart } from '@/lib/api';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { MobileMenu } from '@/components/mobile-menu';

// Vercel Logo
function VercelLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 76 65"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M37.59.25l36.95 64H.64l36.95-64z" />
    </svg>
  );
}

// Nav Link
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

// Cart Icon
function CartIcon({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart — ${count} item${count === 1 ? '' : 's'}` : 'Cart'}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <span className="relative block">
        <ShoppingCart className="size-5" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground">
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
    const cookieStore = await cookies();
    const token = cookieStore.get('cart-token')?.value;
    if (!token) return <CartIcon count={0} />;
    const { data } = await getCart(token);
    return <CartIcon count={data.totalItems} />;
  } catch {
    return <CartIcon count={0} />;
  }
}

// Header
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            <VercelLogo className="size-4.5" />
            <span className="text-sm">Swag Store</span>
          </Link>

          <nav className="hidden items-center md:flex" aria-label="Main navigation">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Search</NavLink>
          </nav>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right:  Cart + Mobile menu */}
        <div className="flex items-center gap-1">
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
