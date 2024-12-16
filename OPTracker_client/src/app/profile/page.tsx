/**
 * Profile Page
 * Displays user profile information and settings
 * Includes sections for avatar management, user info, statistics, and recent activity
 */

'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { UserProfile } from '@/types/user';
import ProfileLayout from '@/components/profile/ProfileLayout';
import RecentActivity from '@/components/profile/RecentActivity';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Example data
const mockProfile: UserProfile = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  joinDate: '2024-01-15',
  avatar: null,
  stats: {
    uploaded: '1.5 TB',
    downloaded: '500 GB',
    ratio: 3.0,
    points: 1500,
    rank: 'Power User'
  },
  preferences: {
    notifications: true,
    privateProfile: false,
    language: 'en',
    theme: 'dark'
  }
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveAvatar = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
    <ProfileLayout title="profile.title">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar with avatar and quick stats */}
        <div className="space-y-6">
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="space-y-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-background">
                {(previewUrl || profile.avatar) ? (
                  <Image
                    src={previewUrl || profile.avatar!}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 px-3 py-2 bg-primary text-background rounded hover:bg-primary-dark transition-colors text-sm"
                >
                  {t('profile.actions.uploadAvatar')}
                </button>
                {(previewUrl || profile.avatar) && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-3 py-2 border border-border rounded hover:border-error hover:text-error transition-colors text-sm"
                  >
                    {t('profile.actions.removeAvatar')}
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('profile.fields.ratio')}</span>
                <span className="font-medium">{profile.stats.ratio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('profile.fields.points')}</span>
                <span className="font-medium">{profile.stats.points}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('profile.fields.rank')}</span>
                <span className="font-medium">{profile.stats.rank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          {/* General information */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">{t('profile.sections.info')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  {t('profile.fields.username')}
                </label>
                <input
                  type="text"
                  value={profile.username}
                  readOnly
                  className="w-full p-2 bg-background border border-border rounded hover:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  {t('profile.fields.email')}
                </label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full p-2 bg-background border border-border rounded hover:border-primary transition-colors"
                />
              </div>
              <button
                type="button"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                {t('profile.actions.changePassword')}
              </button>
            </div>
          </section>

          {/* Detailed statistics */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">{t('profile.sections.stats')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm text-text-secondary">
                  {t('profile.fields.uploaded')}
                </span>
                <span className="text-lg font-medium text-green">{profile.stats.uploaded}</span>
              </div>
              <div>
                <span className="block text-sm text-text-secondary">
                  {t('profile.fields.downloaded')}
                </span>
                <span className="text-lg font-medium text-primary">{profile.stats.downloaded}</span>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">{t('profile.sections.preferences')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>{t('profile.preferences.notifications')}</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.notifications}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, notifications: e.target.checked }
                  })}
                  className="h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{t('profile.preferences.privateProfile')}</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.privateProfile}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, privateProfile: e.target.checked }
                  })}
                  className="h-4 w-4"
                />
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
      </ProfileLayout>
    </DashboardLayout>
  );
} 