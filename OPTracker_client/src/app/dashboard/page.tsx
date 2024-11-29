/**
 * Dashboard Home Page
 * Displays the latest torrents and other dashboard content
 */

'use client';

import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Datos de prueba para los torrents recientes
const mockRecentTorrents = [
  {
    id: 1,
    title: 'One Piece Episode 1080 [1080p]',
    category: 'Anime',
    size: '1.4 GB',
    seeders: 150,
    leechers: 25,
    uploadedAt: '2024-03-20T10:30:00',
    uploader: 'NakamaCrew'
  },
  {
    id: 2,
    title: 'One Piece Chapter 1112 [English]',
    category: 'Manga',
    size: '15 MB',
    seeders: 230,
    leechers: 12,
    uploadedAt: '2024-03-19T15:45:00',
    uploader: 'MangaPlus'
  },
  {
    id: 3,
    title: 'One Piece Film Red [BD-1080p]',
    category: 'Movies',
    size: '4.2 GB',
    seeders: 500,
    leechers: 75,
    uploadedAt: '2024-03-18T20:15:00',
    uploader: 'PirateKing'
  },
  {
    id: 4,
    title: 'One Piece OST Collection',
    category: 'Audio',
    size: '320 MB',
    seeders: 85,
    leechers: 10,
    uploadedAt: '2024-03-17T12:00:00',
    uploader: 'MusicPirate'
  }
];

export default function DashboardHome() {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background text-text p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">
            {t('dashboard.latestTorrents.title')}
          </h1>

          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">{t('dashboard.latestTorrents.table.title')}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">{t('dashboard.latestTorrents.table.category')}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">{t('dashboard.latestTorrents.table.size')}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">S/L</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">{t('dashboard.latestTorrents.table.uploaded')}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">{t('dashboard.latestTorrents.table.uploader')}</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentTorrents.map((torrent) => (
                    <tr key={torrent.id} className="border-b border-border hover:bg-surface/50">
                      <td className="px-4 py-3 text-sm">
                        <a href={`/torrent/${torrent.id}`} className="text-lg font-medium text-text truncate mb-2 hover:text-primary transition-colors">
                          {torrent.title}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-primary">{torrent.category}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{torrent.size}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="text-green">{torrent.seeders} ▲</span>
                        <span className="mx-2 text-text-secondary">•</span>
                        <span className="text-error">{torrent.leechers} ▼</span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(torrent.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">{torrent.uploader}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 