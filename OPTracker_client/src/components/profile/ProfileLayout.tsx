/**
 * ProfileLayout component
 * Manages the layout for the profile page
 * Includes a header with the profile title and navigation
 */

'use client';

import { useTranslation } from 'react-i18next';
import ProfileNav from './ProfileNav';

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function ProfileLayout({ children, title }: ProfileLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          {t(title)}
        </h1>

        <ProfileNav />

        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
} 