'use client';

import Link from 'next/link';
import { Torrent } from '@/types/torrent';

type TorrentCardProps = Torrent;

export default function TorrentCard({ 
  id, name, category, size, seeders, leechers 
}: TorrentCardProps) {
  return (
    <Link 
      href={`/torrents/${id}`}
      className="block bg-surface p-4 rounded border border-border 
                 hover:border-primary transition-colors"
    >
      <h3 className="text-lg font-medium text-text truncate mb-2">
        {name}
      </h3>
      <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
        <div>
          <span className="text-primary">{category}</span>
          <span className="mx-2">•</span>
          <span>{size}</span>
        </div>
        <div className="text-right">
          <span className="text-green">{seeders} ▲</span>
          <span className="mx-2">•</span>
          <span className="text-error">{leechers} ▼</span>
        </div>
      </div>
    </Link>
  );
} 