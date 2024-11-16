/**
 * Admin Dashboard Page
 * Displays key statistics and provides quick access to important admin tasks
 * Includes cards for total users, active users, total torrents, active torrents, total downloads, and system load
 * Allows administrators to monitor the site status and manage various aspects of the platform
 */

'use client';

import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import StatsCard from '@/components/admin/StatsCard';

// Example data - will be replaced with real data
const mockStats = {
  totalUsers: 1250,
  activeUsers: 890,
  totalTorrents: 5430,
  activeTorrents: 4200,
  totalDownloads: '125TB',
  systemLoad: '45%'
};

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-primary mb-6">
        {t('admin.dashboard.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title={t('admin.dashboard.stats.totalUsers')}
          value={mockStats.totalUsers}
          trend={12}
        />
        <StatsCard
          title={t('admin.dashboard.stats.activeUsers')}
          value={mockStats.activeUsers}
          trend={5}
        />
        <StatsCard
          title={t('admin.dashboard.stats.totalTorrents')}
          value={mockStats.totalTorrents}
          trend={8}
        />
        <StatsCard
          title={t('admin.dashboard.stats.activeTorrents')}
          value={mockStats.activeTorrents}
          trend={-3}
        />
        <StatsCard
          title={t('admin.dashboard.stats.totalDownloads')}
          value={mockStats.totalDownloads}
          trend={15}
        />
        <StatsCard
          title={t('admin.dashboard.stats.systemLoad')}
          value={mockStats.systemLoad}
        />
      </div>
    </AdminLayout>
  );
} 