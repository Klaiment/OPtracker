'use client';

import { useTranslation } from 'react-i18next';
import { DownloadHistory } from '@/types/user';

interface DownloadHistoryTableProps {
  downloads: DownloadHistory[];
}

export default function DownloadHistoryTable({ downloads }: DownloadHistoryTableProps) {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.name')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.date')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.size')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.uploaded')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.downloaded')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.ratio')}
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
              {t('profile.history.table.status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((download) => (
            <tr key={download.id} className="border-b border-border hover:bg-surface/50">
              <td className="px-4 py-3 text-sm">{download.torrentName}</td>
              <td className="px-4 py-3 text-sm">{download.downloadDate}</td>
              <td className="px-4 py-3 text-sm">{download.size}</td>
              <td className="px-4 py-3 text-sm">{download.uploaded}</td>
              <td className="px-4 py-3 text-sm">{download.downloaded}</td>
              <td className="px-4 py-3 text-sm">{download.ratio.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded text-xs ${
                  download.status === 'completed' ? 'bg-green/20 text-green' :
                  download.status === 'active' ? 'bg-primary/20 text-primary' :
                  'bg-text-secondary/20 text-text-secondary'
                }`}>
                  {t(`profile.history.status.${download.status}`)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 