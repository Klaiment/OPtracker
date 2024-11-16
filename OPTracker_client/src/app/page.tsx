/**
 * Home Page
 * Displays the main page with search bar, navigation, and footer
 * Includes a search bar for quick search and navigation links
 */

'use client';

import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex flex-col items-center justify-center p-8 w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl tracking-tighter text-primary">
            OP<span className="text-accent">Tracker</span>
          </h1>
          <small className="block mt-2 text-text-secondary">
            {t('home.subtitle')}
          </small>
        </div>
        
        <SearchBar />

        <nav className="mt-8 text-center">
          <Link href="/browse" className="px-4 py-2 text-text hover:text-primary transition-colors">
            {t('home.nav.browse')}
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/recent" className="px-4 py-2 text-text hover:text-primary transition-colors">
            {t('home.nav.recent')}
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/top100" className="px-4 py-2 text-text hover:text-primary transition-colors">
            {t('home.nav.top')}
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/stats" className="px-4 py-2 text-text hover:text-primary transition-colors">
            {t('home.nav.stats')}
          </Link>
        </nav>
      </main>

      <footer className="text-center p-8 bg-surface border-t border-border">
        <p className="text-text-secondary mb-4">{t('home.footer.description')}</p>
        <nav>
          <Link href="/about" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.about')}
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/stats" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.stats')}
          </Link>
          <span className="text-border mx-2">|</span>
          <Link href="/api" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.api')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
