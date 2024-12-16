/**
 * Login page component
 * Handles user authentication
 * Provides login form and navigation
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';
import axios from 'axios';
import { config } from '@system/next.config';
import { showNotification } from '@/utils/notifications';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  if (localStorage.getItem('token')) {
    router.push('/');
  }
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here goes the login logic
    await axios
      .post(`${config.WEBSITE_URL}/api/auth/local/`, {
        identifier: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.jwt);
        if (typeof window !== 'undefined') {
          router.push('/');
        }
      })
      .catch((err) => {
        showNotification.error(t('auth.notification.error'));
      });
  };

  return (
    <AuthCard title={t('auth.login.title')}>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label={t('auth.login.username')}
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <AuthInput
          label={t('auth.login.password')}
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-background py-2 rounded 
                     hover:bg-primary-dark transition-colors font-medium"
        >
          {t('auth.login.submit')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link
          href="/auth/recovery"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          {t('auth.login.forgotPassword')}
        </Link>
      </div>

      <div className="mt-4 text-center text-sm">
        <span className="text-text-secondary">
          {t('auth.login.noAccount')}{' '}
        </span>
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          {t('auth.login.register')}
        </Link>
      </div>
    </AuthCard>
  );
}
