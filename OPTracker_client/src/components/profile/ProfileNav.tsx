'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', label: 'profile.nav.overview' },
    { href: '/profile/history', label: 'profile.nav.history' },
    { href: '/profile/stats', label: 'profile.nav.stats' },
    { href: '/profile/settings', label: 'profile.nav.settings' }
  ];

  return (
    <nav className="bg-surface border border-border rounded-lg p-1 flex flex-wrap gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 rounded text-sm transition-colors ${
            pathname === item.href
              ? 'bg-primary text-background'
              : 'hover:bg-background'
          }`}
        >
          {t(item.label)}
        </Link>
      ))}
    </nav>
  );
} 