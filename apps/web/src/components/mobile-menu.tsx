'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Mobile Nav Link
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

// Mobile Menu
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on outside click and Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative md:hidden">
      {/* Hamburger toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="dialog"
          aria-label="Navigation menu"
          className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-full z-50 mt-1.5 w-44 rounded-lg border border-border bg-card shadow-lg duration-150"
        >
          <nav className="flex flex-col gap-0.5 p-1.5">
            <MobileNavLink href="/" onClick={close}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/search" onClick={close}>
              Search
            </MobileNavLink>
          </nav>
        </div>
      )}
    </div>
  );
}

