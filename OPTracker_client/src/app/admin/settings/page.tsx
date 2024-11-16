/**
 * Admin Settings Page
 * Manages site-wide configuration settings
 * Includes general settings, registration options, and tracker parameters
 * Allows administrators to customize the site behavior and appearance
 */


'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';

interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    maintenance: boolean;
    logo: string | null;
  };
  registration: {
    allowRegistration: boolean;
    requireInvitation: boolean;
    emailVerification: boolean;
  };
  tracker: {
    announceInterval: number;
    minAnnounceInterval: number;
    maxPeers: number;
  };
}

// Example data
const defaultSettings: Settings = {
  general: {
    siteName: 'OPTracker',
    siteDescription: 'The OverPowered Torrent Tracker',
    maintenance: false,
    logo: null
  },
  registration: {
    allowRegistration: true,
    requireInvitation: false,
    emailVerification: true
  },
  tracker: {
    announceInterval: 1800,
    minAnnounceInterval: 900,
    maxPeers: 50
  }
};

export default function AdminSettingsPage() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create URL for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // In a real implementation, here you would upload the file to the server
      // For now, we just update the local state
      setSettings(prev => ({
        ...prev,
        general: {
          ...prev.general,
          logo: url
        }
      }));
    }
  };

  const handleRemoveLogo = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        logo: null
      }
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSettings(defaultSettings);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-primary mb-6">
        {t('admin.settings.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <section className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">
            {t('admin.settings.sections.general.title')}
          </h3>
          <div className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm mb-2">
                {t('admin.settings.sections.general.logo')}
              </label>
              <div className="space-y-4">
                {previewUrl && (
                  <div className="relative w-64 h-20">
                    <Image
                      src={previewUrl}
                      alt="Site logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-primary text-background rounded hover:bg-primary-dark transition-colors"
                  >
                    {t('admin.settings.sections.general.uploadLogo')}
                  </button>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="px-4 py-2 border border-border rounded hover:border-error hover:text-error transition-colors"
                    >
                      {t('admin.settings.sections.general.removeLogo')}
                    </button>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {t('admin.settings.sections.general.logoHelp')}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                {t('admin.settings.sections.general.siteName')}
              </label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, siteName: e.target.value }
                })}
                className="w-full p-2 bg-background border border-border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">
                {t('admin.settings.sections.general.siteDescription')}
              </label>
              <textarea
                value={settings.general.siteDescription}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, siteDescription: e.target.value }
                })}
                className="w-full p-2 bg-background border border-border rounded h-24"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.general.maintenance}
                onChange={(e) => setSettings({
                  ...settings,
                  general: { ...settings.general, maintenance: e.target.checked }
                })}
                className="mr-2"
              />
              <label className="text-sm">
                {t('admin.settings.sections.general.maintenance')}
              </label>
            </div>
          </div>
        </section>

        {/* Registration Settings */}
        <section className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">
            {t('admin.settings.sections.registration.title')}
          </h3>
          <div className="space-y-4">
            {/* Similar input fields for registration settings */}
          </div>
        </section>

        {/* Tracker Settings */}
        <section className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">
            {t('admin.settings.sections.tracker.title')}
          </h3>
          <div className="space-y-4">
            {/* Similar input fields for tracker settings */}
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-border rounded hover:border-primary"
          >
            {t('admin.settings.actions.reset')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-background rounded hover:bg-primary-dark"
          >
            {t('admin.settings.actions.save')}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
} 