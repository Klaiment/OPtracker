'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileLayout from '@/components/profile/ProfileLayout';
import { useTheme } from '@/contexts/ThemeContext';
import PasswordChangeModal from '@/components/profile/PasswordChangeModal';

interface ProfileSettings {
  email: string;
  notifications: {
    emailNotifications: boolean;
    browserNotifications: boolean;
    newsletterSubscription: boolean;
  };
  privacy: {
    showProfile: boolean;
    showStats: boolean;
    showHistory: boolean;
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    downloadPath: string;
  };
}

const defaultSettings: ProfileSettings = {
  email: 'user@example.com',
  notifications: {
    emailNotifications: true,
    browserNotifications: true,
    newsletterSubscription: false,
  },
  privacy: {
    showProfile: true,
    showStats: true,
    showHistory: false,
  },
  preferences: {
    language: 'en',
    theme: 'dark',
    downloadPath: 'C:/Downloads/Torrents',
  },
};

export default function ProfileSettingsPage() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<ProfileSettings>(defaultSettings);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  const handlePasswordChange = (data: { currentPassword: string; newPassword: string }) => {
    console.log('Password change:', data);
    setIsPasswordModalOpen(false);
  };

  return (
    <ProfileLayout title="profile.settings.title">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Security Section */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.settings.sections.security')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  {t('profile.settings.fields.email')}
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full p-2 bg-background border border-border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                {t('profile.settings.actions.changePassword')}
              </button>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.settings.sections.notifications')}
            </h2>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{t(`profile.settings.notifications.${key}`)}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Section */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.settings.sections.privacy')}
            </h2>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span>{t(`profile.settings.privacy.${key}`)}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      privacy: {
                        ...settings.privacy,
                        [key]: e.target.checked
                      }
                    })}
                    className="h-4 w-4"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-surface rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('profile.settings.sections.preferences')}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>{t('profile.settings.preferences.theme.title')}</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2 border border-border rounded hover:border-primary transition-colors"
                >
                  {theme === 'dark' 
                    ? t('profile.settings.preferences.theme.light') 
                    : t('profile.settings.preferences.theme.dark')}
                </button>
              </div>
              {/* ... otras preferencias ... */}
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-background rounded hover:bg-primary-dark transition-colors"
            >
              {t('profile.settings.actions.save')}
            </button>
          </div>
        </form>

        {isPasswordModalOpen && (
          <PasswordChangeModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordChange}
          />
        )}
      </div>
    </ProfileLayout>
  );
} 