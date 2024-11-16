'use client';

import LanguageSelector from '../ui/LanguageSelector';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 p-4 z-50 flex items-center gap-4">
      <ThemeToggle />
      <LanguageSelector />
    </header>
  );
} 