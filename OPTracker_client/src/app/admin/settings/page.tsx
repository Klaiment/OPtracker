'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';

// Datos de ejemplo
const defaultSettings = {
  general: {
    siteName: 'OPTracker',
    siteDescription: 'The OverPowered Torrent Tracker',
    maintenance: false
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
  const [settings, setSettings] = useState(defaultSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
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