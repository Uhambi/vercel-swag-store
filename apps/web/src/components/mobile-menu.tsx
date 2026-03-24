'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

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
      className="flex items-center rounded-md px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// Mobile Menu
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  // Close on outside click and Escape key
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
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
    <div className="relative md:hidden" ref={containerRef}>
      {/* Hamburger toggle */}
      <button
        aria-controls="mobile-nav-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          aria-label="Navigation menu"
          className="fade-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-1.5 w-44 animate-in rounded-lg border border-border bg-card shadow-lg duration-150"
          id="mobile-nav-menu"
          role="dialog"
        >
          <nav className="flex flex-col gap-0.5 p-1.5">
            <MobileNavLink href="/" onClick={close}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/search" onClick={close}>
              Search
            </MobileNavLink>

            {/* Theme toggle */}
            <div className="mt-0.5 flex items-center justify-between border-border border-t px-3 py-2">
              <span className="font-medium text-muted-foreground text-sm">
                Theme
              </span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
