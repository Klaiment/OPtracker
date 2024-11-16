/**
 * Torrent List Page
 * Displays a list of torrents
 * Includes filters and a grid of torrent cards
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TorrentCard from '@/components/torrents/TorrentCard';
import TorrentFilters from '@/components/torrents/TorrentFilters';
import { Torrent, TorrentFilter } from '@/types/torrent';

// Example data - will be replaced with real data from the API
const mockTorrents: Torrent[] = [
  {
    id: '1',
    name: 'Ubuntu 22.04 LTS',
    category: 'Applications',
    size: '3.2 GB',
    seeders: 150,
    leechers: 25,
    added: '2024-01-15'
  },
  {
    id: '2',
    name: 'Debian 12',
    category: 'Applications',
    size: '2.8 GB',
    seeders: 120,
    leechers: 15,
    added: '2024-01-10'
  },
];

export default function TorrentListPage() {
  const { t } = useTranslation();
  const [torrents] = useState(mockTorrents);

  const handleFilterChange = (filters: TorrentFilter) => {
    console.log('Filters changed:', filters);
    // Here goes the filtering logic
  };

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">
          {t('torrents.list.title')}
        </h1>

        <TorrentFilters onFilterChange={handleFilterChange} />

        {torrents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {torrents.map((torrent) => (
              <TorrentCard
                key={torrent.id}
                {...torrent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-text-secondary py-12">
            {t('torrents.list.noResults')}
          </div>
        )}
      </div>
    </div>
  );
} 