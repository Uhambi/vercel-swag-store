'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#171719' : '#ffffff');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="cursor-pointer rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
        type="button"
      >
        <Moon className="size-5" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      type="button"
    >
      <Sun
        aria-hidden={!isDark}
        className="size-5 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden={isDark}
        className="absolute top-2 left-2 size-5 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
    </button>
  );
}
