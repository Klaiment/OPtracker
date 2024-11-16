'use client';

import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { User, TableColumn } from '@/types/admin';

// Datos de ejemplo
const mockUsers: User[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    status: 'active',
    joined: '2024-01-15',
    ratio: 2.5
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    status: 'banned',
    joined: '2024-01-10',
    ratio: 0.8
  },
];

export default function AdminUsersPage() {
  const { t } = useTranslation();

  const columns: TableColumn<User>[] = [
    { key: 'username', label: t('admin.users.table.username') },
    { key: 'email', label: t('admin.users.table.email') },
    {
      key: 'status',
      label: t('admin.users.table.status'),
      render: (status) => (
        <span className={`px-2 py-1 rounded text-xs ${
          status === 'active' ? 'bg-green/20 text-green' :
          status === 'banned' ? 'bg-error/20 text-error' :
          'bg-yellow/20 text-yellow'
        }`}>
          {t(`admin.users.status.${status}`)}
        </span>
      )
    },
    { key: 'joined', label: t('admin.users.table.joined') },
    {
      key: 'ratio',
      label: t('admin.users.table.ratio'),
      render: (ratio) => Number(ratio).toFixed(2)
    }
  ];

  const renderActions = (user: User) => (
    <div className="flex gap-2">
      {user.status === 'banned' ? (
        <button className="text-sm text-primary hover:text-primary-dark">
          {t('admin.users.actions.unban')}
        </button>
      ) : (
        <button className="text-sm text-error hover:text-error/80">
          {t('admin.users.actions.ban')}
        </button>
      )}
      <button className="text-sm text-primary hover:text-primary-dark">
        {t('admin.users.actions.edit')}
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-primary mb-6">
        {t('admin.users.title')}
      </h2>

      <div className="bg-surface rounded-lg border border-border p-6">
        <DataTable<User>
          columns={columns}
          data={mockUsers}
          actions={renderActions}
        />
      </div>
    </AdminLayout>
  );
} 