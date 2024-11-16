'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'admin.nav.dashboard' },
    { href: '/admin/users', label: 'admin.nav.users' },
    { href: '/admin/torrents', label: 'admin.nav.torrents' },
    { href: '/admin/settings', label: 'admin.nav.settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">
            {t('admin.dashboard.title')}
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-6 py-3 text-sm ${
                pathname === item.href
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-text hover:bg-surface-light'
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  );
} 