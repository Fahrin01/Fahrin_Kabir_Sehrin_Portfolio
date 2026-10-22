import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// The initial class is set by the inline script in index.html before first paint;
// this hook reads it, keeps it in sync, and remembers the visitor's choice.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Follow system changes until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!readSavedTheme()) setTheme(systemPrefersDark() ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable: theme still changes for this visit */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
