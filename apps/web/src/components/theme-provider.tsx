'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
