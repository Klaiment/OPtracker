/**
 * Internationalization provider
 * Handles language switching and loading
 */

'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [i18n]);

  if (isLoading) {
    return null; // Or a loading spinner if you prefer
  }

  return <>{children}</>;
} 