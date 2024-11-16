/**
 * Header component
 * Displays the header with language and theme toggles
 */

'use client';

import LanguageSelector from '../ui/LanguageSelector';
import ThemeToggle from '../ui/ThemeToggle';

// Header component containing language and theme toggles
export default function Header() {
  return (
    <header className="fixed top-0 right-0 p-4 z-50 flex items-center gap-4">
      <ThemeToggle />
      <LanguageSelector />
    </header>
  );
} 