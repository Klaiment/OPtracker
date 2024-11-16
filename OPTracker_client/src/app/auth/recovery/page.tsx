'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import AuthInput from '@/components/auth/AuthInput';

export default function RecoveryPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de recuperación
    console.log('Recovery:', email);
    setSubmitted(true);
  };

  return (
    <AuthCard title={t('auth.recovery.title')}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <AuthInput
            label={t('auth.recovery.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="w-full bg-primary text-background py-2 rounded 
                       hover:bg-primary-dark transition-colors font-medium"
          >
            {t('auth.recovery.submit')}
          </button>
        </form>
      ) : (
        <div className="text-center text-text">
          <p className="mb-6">{t('auth.recovery.success')}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link 
          href="/auth/login"
          className="text-primary hover:text-primary-dark transition-colors text-sm"
        >
          {t('auth.recovery.backToLogin')}
        </Link>
      </div>
    </AuthCard>
  );
} 