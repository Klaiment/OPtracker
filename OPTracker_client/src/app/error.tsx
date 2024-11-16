/**
 * Error Page
 * Displays an error message and provides a retry button
 * Includes a home button to return to the main page
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center p-8 bg-surface border border-border rounded-lg max-w-2xl w-[90%]">
          <h1 className="text-6xl text-error leading-none font-mono">500</h1>
          <p className="text-2xl text-text mt-4 font-medium">
            {t('errors.500.title')}
          </p>
          
          <div className="my-6 p-4 bg-background rounded border border-border">
            <code className="text-orange font-mono text-sm">
              {error.message || t('errors.500.message')}
            </code>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={reset} 
              className="px-6 py-3 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
            >
              {t('errors.500.retry')}
            </button>
            <Link 
              href="/" 
              className="px-6 py-3 border border-border text-text rounded hover:border-primary hover:bg-surface transition-colors"
            >
              {t('errors.500.home')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 