'use client';

import { ThemeProvider } from 'next-themes';
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

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThemeReadyGuard>{children}</ThemeReadyGuard>
    </ThemeProvider>
  );
}
