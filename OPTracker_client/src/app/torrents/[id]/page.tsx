'use client';

import { useTranslation } from 'react-i18next';
import TorrentInfo from '@/components/torrents/TorrentInfo';
import { useParams } from 'next/navigation';

// Datos de ejemplo - serán reemplazados por datos reales de la API
const mockTorrent = {
  id: '1',
  name: 'Ubuntu 22.04 LTS',
  description: 'Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software.\n\nUbuntu is officially released in multiple editions: Desktop, Server, and Core for Internet of things devices and robots.',
  category: 'Applications',
  size: '3.2 GB',
  added: '2024-01-15',
  seeders: 150,
  leechers: 25,
  completed: 1250,
  ratio: 2.5,
};

export default function TorrentDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = params?.id as string;

  // Aquí iría la lógica para obtener los datos del torrent usando el ID
  console.log('Torrent ID:', id);

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <div className="max-w-5xl mx-auto">
        <TorrentInfo {...mockTorrent} />
        
        <div className="mt-6 flex justify-center">
          <button className="bg-primary text-background px-8 py-3 rounded 
                           hover:bg-primary-dark transition-colors font-medium">
            {t('torrents.detail.download')}
          </button>
        </div>
      </div>
    </div>
  );
} 