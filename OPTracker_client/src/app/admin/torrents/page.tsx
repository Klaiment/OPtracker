/**
 * Admin Torrents Page
 * Manages torrent uploads and moderation
 * Includes a table of torrents with actions for approval, rejection, and deletion
 * Allows administrators to manage the torrent upload process and ensure compliance
 */

'use client';

import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { AdminTorrent, TableColumn } from '@/types/admin';

// Example data
const mockTorrents: AdminTorrent[] = [
  {
    id: 1,
    name: 'Ubuntu 22.04 LTS',
    uploader: 'user1',
    size: '3.2 GB',
    added: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Debian 12',
    uploader: 'user2',
    size: '2.8 GB',
    added: '2024-01-10',
    status: 'pending'
  },
];

export default function AdminTorrentsPage() {
  const { t } = useTranslation();

  const columns: TableColumn<AdminTorrent>[] = [
    { key: 'name', label: t('admin.torrents.table.name') },
    { key: 'uploader', label: t('admin.torrents.table.uploader') },
    { key: 'size', label: t('admin.torrents.table.size') },
    { key: 'added', label: t('admin.torrents.table.added') },
    {
      key: 'status',
      label: t('admin.torrents.table.status'),
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'active' ? 'bg-green/20 text-green' :
          status === 'pending' ? 'bg-yellow/20 text-yellow' :
          status === 'rejected' ? 'bg-error/20 text-error' :
          'bg-primary/20 text-primary'
        }`}>
          {t(`admin.torrents.status.${status}`)}
        </span>
      )
    }
  ];

  const renderActions = (torrent: AdminTorrent) => (
    <div className="flex gap-2">
      {torrent.status === 'pending' && (
        <>
          <button className="text-sm text-green hover:text-green/80">
            {t('admin.torrents.actions.approve')}
          </button>
          <button className="text-sm text-error hover:text-error/80">
            {t('admin.torrents.actions.reject')}
          </button>
        </>
      )}
      <button className="text-sm text-primary hover:text-primary-dark">
        {t('admin.torrents.actions.feature')}
      </button>
      <button className="text-sm text-error hover:text-error/80">
        {t('admin.torrents.actions.delete')}
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-primary mb-6">
        {t('admin.torrents.title')}
      </h2>

      <div className="bg-surface rounded-lg border border-border p-6">
        <DataTable<AdminTorrent>
          columns={columns}
          data={mockTorrents}
          actions={renderActions}
        />
      </div>
    </AdminLayout>
  );
} 