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
import axios from "axios";
import {showNotification} from "@/utils/notifications";
import PasswordStrengthBar from '@/components/auth/PasswordStrengthBar';

// Opción 1: Usando process.env directamente
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = t('auth.register.errors.username');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.register.errors.email');
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = t('auth.register.errors.passwordRequirements');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.register.errors.passwordMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    
    if (attempted) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
      const newErrors = { ...errors };
      if (!passwordRegex.test(newPassword)) {
        newErrors.password = t('auth.register.errors.passwordRequirements');
      } else {
        delete newErrors.password;
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    
    if (validateForm()) {
      try {
        await axios.post(`${API_URL}/api/auth/local/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        showNotification.success(t('auth.notification.successRegister'));
      } catch {
        showNotification.error(t('auth.notification.error'));
      }
    }
  };

  return (
    <AuthCard title={t('auth.register.title')}>
      <form onSubmit={handleSubmit}>
        <AuthInput
          label={t('auth.register.username')}
          type="text"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          error={attempted ? errors.username : undefined}
          required
        />
        <AuthInput
          label={t('auth.register.email')}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={attempted ? errors.email : undefined}
          required
        />
        <div className="space-y-1">
          <AuthInput
            label={t('auth.register.password')}
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
            error={attempted ? errors.password : undefined}
            required
          />
          <PasswordStrengthBar password={formData.password} />
        </div>
        <div className="mt-3">
          <AuthInput
            label={t('auth.register.confirmPassword')}
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            error={attempted ? errors.confirmPassword : undefined}
            required
          />
        </div>
        
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