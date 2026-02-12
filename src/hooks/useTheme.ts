import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '@/types';

const THEME_KEY = 'csharp-academy-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(THEME_KEY, theme);
      
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme, isLoaded]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const setSpecificTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLoaded,
    toggleTheme,
    setTheme: setSpecificTheme
  };
}
