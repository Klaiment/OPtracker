'use client';

import { useTranslation } from 'react-i18next';

interface ActivityItem {
  id: string;
  type: 'download' | 'achievement' | 'ratio' | 'seeding';
  title: string;
  description: string;
  date: string;
  metadata?: {
    torrentName?: string;
    achievement?: string;
    oldRatio?: number;
    newRatio?: number;
    seedingCount?: number;
  };
}

// Datos de ejemplo
const mockActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'download',
    title: 'Started new download',
    description: 'Ubuntu 22.04 LTS',
    date: '2024-02-15T10:30:00',
    metadata: {
      torrentName: 'Ubuntu 22.04 LTS'
    }
  },
  {
    id: '2',
    type: 'achievement',
    title: 'New achievement unlocked',
    description: 'Top Seeder',
    date: '2024-02-14T15:20:00',
    metadata: {
      achievement: 'top_seeder'
    }
  },
  {
    id: '3',
    type: 'ratio',
    title: 'Ratio milestone reached',
    description: 'Ratio increased to 2.5',
    date: '2024-02-13T09:45:00',
    metadata: {
      oldRatio: 2.0,
      newRatio: 2.5
    }
  }
];

export default function RecentActivity() {
  const { t } = useTranslation();

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'download':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
        );
      case 'ratio':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        );
      case 'seeding':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold mb-4">
        {t('profile.activity.title')}
      </h2>
      
      <div className="space-y-4">
        {mockActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded hover:bg-background transition-colors"
          >
            <div className={`p-2 rounded ${
              activity.type === 'download' ? 'text-primary bg-primary/10' :
              activity.type === 'achievement' ? 'text-yellow bg-yellow/10' :
              activity.type === 'ratio' ? 'text-green bg-green/10' :
              'text-accent bg-accent/10'
            }`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium">
                {t(`profile.activity.types.${activity.type}.title`, {
                  ...activity.metadata
                })}
              </h3>
              <p className="text-text-secondary text-sm">
                {activity.description}
              </p>
            </div>
            
            <time className="text-text-secondary text-sm">
              {formatDate(activity.date)}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
} 