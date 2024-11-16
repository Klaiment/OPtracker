/**
 * Client wrapper component to handle hydration issues
 * Wraps the entire application to ensure consistent client-side rendering
 */

'use client';

import I18nProvider from './i18n/I18nProvider';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  );
} 