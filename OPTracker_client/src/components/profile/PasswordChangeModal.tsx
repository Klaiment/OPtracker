'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
  }) => void;
}

export default function PasswordChangeModal({
  isOpen,
  onClose,
  onSubmit
}: PasswordChangeModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('profile.settings.errors.passwordMatch'));
      return;
    }
    onSubmit({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-lg border border-border w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {t('profile.settings.actions.changePassword')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">
              {t('profile.settings.fields.currentPassword')}
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full p-2 bg-background border border-border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">
              {t('profile.settings.fields.newPassword')}
            </label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="w-full p-2 bg-background border border-border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">
              {t('profile.settings.fields.confirmPassword')}
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-2 bg-background border border-border rounded"
              required
            />
          </div>

          {error && (
            <p className="text-error text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded hover:border-primary transition-colors"
            >
              {t('profile.settings.actions.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-background rounded hover:bg-primary-dark transition-colors"
            >
              {t('profile.settings.actions.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 