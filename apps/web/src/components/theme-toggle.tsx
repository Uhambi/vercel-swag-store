'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#171719' : '#ffffff');
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      suppressHydrationWarning
      type="button"
    >
      <Sun
        aria-hidden={!isDark}
        className="size-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
        suppressHydrationWarning
      />
      <Moon
        aria-hidden={isDark}
        className="absolute top-2 left-2 size-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
        suppressHydrationWarning
      />
      <span className="sr-only" suppressHydrationWarning>
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
    </button>
  );
}
