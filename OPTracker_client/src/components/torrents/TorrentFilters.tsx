/**
 * TorrentFilters component
 * Displays the torrent filters with category, sort, and search options
 */

'use client';

import { useTranslation } from 'react-i18next';
import { TorrentFilter } from '@/types/torrent';

interface TorrentFiltersProps {
  onFilterChange: (filters: TorrentFilter) => void;
}

export default function TorrentFilters({ onFilterChange }: TorrentFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-surface p-4 rounded border border-border mb-6">
      <h2 className="text-lg font-medium mb-4">{t('torrents.list.filters.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select 
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="p-2 bg-background text-text border border-border rounded 
                     hover:border-primary transition-colors"
        >
          <option value="">{t('torrents.list.filters.category')}</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="applications">Applications</option>
          <option value="games">Games</option>
          <option value="other">Other</option>
        </select>

        <select 
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          className="p-2 bg-background text-text border border-border rounded 
                     hover:border-primary transition-colors"
        >
          <option value="newest">{t('torrents.list.filters.order.newest')}</option>
          <option value="oldest">{t('torrents.list.filters.order.oldest')}</option>
          <option value="mostDownloaded">{t('torrents.list.filters.order.mostDownloaded')}</option>
          <option value="mostSeeded">{t('torrents.list.filters.order.mostSeeded')}</option>
          <option value="largest">{t('torrents.list.filters.order.largest')}</option>
          <option value="smallest">{t('torrents.list.filters.order.smallest')}</option>
        </select>

        <input
          type="text"
          placeholder={t('home.search.placeholder')}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="p-2 bg-background text-text border border-border rounded 
                     hover:border-primary transition-colors"
        />
      </div>
    </div>
  );
} 