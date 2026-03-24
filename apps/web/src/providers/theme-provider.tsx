'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ReactNode, useEffect } from 'react';

function ThemeReadyGuard({ children }: { children: ReactNode }) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.documentElement.setAttribute('data-theme-ready', '');
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return children;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <ThemeReadyGuard>{children}</ThemeReadyGuard>
    </NextThemesProvider>
  );
}
