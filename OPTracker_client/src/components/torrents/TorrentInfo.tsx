'use client';

import { useTranslation } from 'react-i18next';

interface TorrentInfoProps {
  name: string;
  description: string;
  size: string;
  added: string;
  seeders: number;
  leechers: number;
  completed: number;
  ratio: number;
  category: string;
}

export default function TorrentInfo({
  name, description, size, added, seeders, leechers, completed, ratio, category
}: TorrentInfoProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-surface p-6 rounded border border-border">
      <h1 className="text-2xl font-bold text-primary mb-4">{name}</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <span className="text-text-secondary block text-sm">
            {t('torrents.detail.stats.size')}
          </span>
          <span className="text-text">{size}</span>
        </div>
        <div>
          <span className="text-text-secondary block text-sm">
            {t('torrents.detail.stats.added')}
          </span>
          <span className="text-text">{added}</span>
        </div>
        <div>
          <span className="text-text-secondary block text-sm">Category</span>
          <span className="text-primary">{category}</span>
        </div>
        <div>
          <span className="text-text-secondary block text-sm">
            {t('torrents.detail.stats.ratio')}
          </span>
          <span className="text-text">{ratio.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-background p-3 rounded">
          <span className="text-green text-xl block">{seeders}</span>
          <span className="text-text-secondary text-sm">
            {t('torrents.detail.stats.seeders')}
          </span>
        </div>
        <div className="bg-background p-3 rounded">
          <span className="text-error text-xl block">{leechers}</span>
          <span className="text-text-secondary text-sm">
            {t('torrents.detail.stats.leechers')}
          </span>
        </div>
        <div className="bg-background p-3 rounded">
          <span className="text-yellow text-xl block">{completed}</span>
          <span className="text-text-secondary text-sm">
            {t('torrents.detail.stats.completed')}
          </span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-text-secondary whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
} 