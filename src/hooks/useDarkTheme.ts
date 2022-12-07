import { useEffect } from 'react';

export const useDarkTheme = () => {
  useEffect(() => {
    localStorage.theme = 'dark';
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
};
