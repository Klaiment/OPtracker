'use client';

import LanguageSelector from '../ui/LanguageSelector';

export default function Header() {
  return (
    <header className="fixed top-0 right-0 p-4 z-50">
      <LanguageSelector />
    </header>
  );
} 