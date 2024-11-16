/**
 * Footer component
 * Displays the footer with navigation links and a description
 */

'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="text-center p-8 bg-surface border-t border-border">
      <div className="flex flex-col items-center gap-4">
        <p className="text-text-secondary">
          {t('home.footer.description')}
        </p>
        
        <nav className="flex items-center gap-4">
          <Link href="/about" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.about')}
          </Link>
          <span className="text-border">|</span>
          <Link href="/stats" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.stats')}
          </Link>
          <span className="text-border">|</span>
          <Link href="/api" className="px-4 text-text hover:text-primary transition-colors">
            {t('home.footer.api')}
          </Link>
        </nav>
      </div>
    </footer>
  );
} 