/**
 * Register page component
 * Handles new user registration
 * Includes form validation
 */

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';
import { config } from '@system/next.config';
import axios from 'axios';
import { showNotification } from '@/utils/notifications';
import { useRouter } from 'next/navigation';
import PasswordStrengthBar from '@/components/auth/PasswordStrengthBar';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  if (localStorage.getItem('token')) {
    router.push('/');
  }
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = t('auth.register.errors.username');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.register.errors.email');
    }

    if (formData.password.length < 8) {
      newErrors.password = t('auth.register.errors.password');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.passwordMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here goes the registration logic
      await axios
        .post(`${config.WEBSITE_URL}/api/auth/local/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          showNotification.success(t('auth.notification.successRegister'));
        })
        .catch((err) => {
          showNotification.error(t('auth.notification.error'));
        });
    }
  };

  return (
    <AuthCard title={t('auth.register.title')}>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label={t('auth.register.username')}
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          error={errors.username}
          required
        />
        <AuthInput
          label={t('auth.register.email')}
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
          required
        />
        <AuthInput
          label={t('auth.register.password')}
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          error={errors.password}
          required
        />
        <PasswordStrengthBar password={formData.password} />
        <AuthInput
          label={t('auth.register.confirmPassword')}
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          error={errors.confirmPassword}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-background py-2 rounded
                     hover:bg-primary-dark transition-colors font-medium"
        >
          {t('auth.register.submit')}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">
          {t('auth.register.hasAccount')}{' '}
        </span>
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          {t('auth.register.login')}
        </Link>
      </div>
    </AuthCard>
  );
}
