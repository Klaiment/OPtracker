/**
 * Profile Stats Page
 * Displays user-specific statistics
 * Includes charts and achievement cards
 */

'use client';

import { useTranslation } from 'react-i18next';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ActivityChart from '@/components/profile/charts/ActivityChart';
import CategoryDistribution from '@/components/profile/charts/CategoryDistribution';
import RatioTrend from '@/components/profile/charts/RatioTrend';
import AchievementCard from '@/components/profile/AchievementCard';
import { mockAchievements } from '@/types/user';

export default function StatsPage() {
  const { t } = useTranslation();

  return (
    <ProfileLayout title="profile.stats.title">
      <div className="space-y-6">
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.stats.charts.activityTitle')}
            </h2>
            <ActivityChart />
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.stats.charts.categoryTitle')}
            </h2>
            <CategoryDistribution />
          </div>

          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.stats.charts.ratioTitle')}
            </h2>
            <RatioTrend />
          </div>

          {/* Achievements */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.stats.achievements.title')}
            </h2>
            <div className="space-y-4">
              {mockAchievements.map((achievement, index) => (
                <AchievementCard
                  key={index}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
} 