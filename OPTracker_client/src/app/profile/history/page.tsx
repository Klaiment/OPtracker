'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileLayout from '@/components/profile/ProfileLayout';
import DownloadHistoryTable from '@/components/profile/DownloadHistoryTable';
import { DownloadHistory } from '@/types/user';

// Datos de ejemplo
const mockDownloads: DownloadHistory[] = [
  {
    id: 1,
    torrentName: 'Ubuntu 22.04 LTS',
    downloadDate: '2024-01-15',
    size: '3.2 GB',
    uploaded: '4.8 GB',
    downloaded: '3.2 GB',
    ratio: 1.5,
    status: 'completed'
  },
  {
    id: 2,
    torrentName: 'Debian 12',
    downloadDate: '2024-01-20',
    size: '2.8 GB',
    uploaded: '1.4 GB',
    downloaded: '2.8 GB',
    ratio: 0.5,
    status: 'active'
  },
  // Más datos de ejemplo...
];

export default function DownloadHistoryPage() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDownloads = mockDownloads.filter(download => {
    const matchesStatus = statusFilter === 'all' || download.status === statusFilter;
    const matchesSearch = download.torrentName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <ProfileLayout title="profile.history.title">
      <div className="space-y-6">
        {/* Filtros */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                {t('profile.history.filters.status')}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 bg-background border border-border rounded hover:border-primary transition-colors"
              >
                <option value="all">{t('profile.history.filters.all')}</option>
                <option value="completed">{t('profile.history.status.completed')}</option>
                <option value="active">{t('profile.history.status.active')}</option>
                <option value="stopped">{t('profile.history.status.stopped')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-2">
                {t('profile.history.filters.search')}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('profile.history.filters.searchPlaceholder')}
                className="w-full p-2 bg-background border border-border rounded hover:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Resumen de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg border border-border p-4">
            <div className="text-text-secondary text-sm">
              {t('profile.history.stats.totalDownloads')}
            </div>
            <div className="text-2xl font-semibold mt-1">
              {mockDownloads.length}
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-4">
            <div className="text-text-secondary text-sm">
              {t('profile.history.stats.activeDownloads')}
            </div>
            <div className="text-2xl font-semibold mt-1">
              {mockDownloads.filter(d => d.status === 'active').length}
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-4">
            <div className="text-text-secondary text-sm">
              {t('profile.history.stats.totalData')}
            </div>
            <div className="text-2xl font-semibold mt-1">
              156.4 GB
            </div>
          </div>
          <div className="bg-surface rounded-lg border border-border p-4">
            <div className="text-text-secondary text-sm">
              {t('profile.history.stats.avgRatio')}
            </div>
            <div className="text-2xl font-semibold mt-1">
              2.15
            </div>
          </div>
        </div>

        {/* Tabla de historial */}
        <div className="bg-surface rounded-lg border border-border overflow-hidden">
          <DownloadHistoryTable downloads={filteredDownloads} />
        </div>
      </div>
    </ProfileLayout>
  );
} 