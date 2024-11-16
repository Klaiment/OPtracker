'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';

export default function LoginPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de login
    console.log('Login:', formData);
  };

  return (
    <AuthCard title={t('auth.login.title')}>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label={t('auth.login.username')}
          type="text"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          required
        />
        <AuthInput
          label={t('auth.login.password')}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
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