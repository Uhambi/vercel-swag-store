'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';
import { useRouterTransition } from '@/components/router-transition-provider';

interface NavLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const { navigate } = useRouterTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  const isCurrentPage = pathname === href && searchParams.size === 0;

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return;
    }

    e.preventDefault();

    if (isCurrentPage) {
      return;
    }

    onClick?.();
    navigate(href);
  }

  const linkClassName = isCurrentPage
    ? `pointer-events-none ${className}`
    : className;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={linkClassName}
      data-active={isActive || undefined}
      href={href}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
