'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from '@/components/nav-link';
import { useClickOutside } from '@/hooks/use-click-outside';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(
    () => setIsOpen(false),
    isOpen,
  );

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <div className="md:hidden" ref={containerRef}>
      {/* Hamburger toggle */}
      <button
        aria-controls="mobile-nav-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          aria-label="Navigation menu"
          className="fade-in slide-in-from-top-2 absolute top-full right-4 z-50 mt-1.5 w-50 animate-in rounded-lg border border-border bg-card shadow-lg duration-150"
          id="mobile-nav-menu"
          role="dialog"
        >
          <nav className="flex flex-col gap-0.5 p-1.5">
            <NavLink
              className="flex items-center rounded-md px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground data-active:bg-accent data-active:text-foreground"
              href="/"
              onClick={close}
            >
              Home
            </NavLink>
            <NavLink
              className="flex items-center rounded-md px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground data-active:bg-accent data-active:text-foreground"
              href="/search"
              onClick={close}
            >
              Search
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
}
