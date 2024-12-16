/**
 * Password Strength Bar component
 * Displays the strength of a password
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ password }) => {
  const { t } = useTranslation();

  const calculateStrength = (): { strength: number; message: string } => {
    let strength = 0;

    // Individual validations (20% each)
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;

    let message = t('auth.register.passwordStrength.weak');
    if (strength > 20) message = t('auth.register.passwordStrength.fair');
    if (strength > 60) message = t('auth.register.passwordStrength.good');
    if (strength > 80) message = t('auth.register.passwordStrength.strong');

    return { strength, message };
  };

  const { strength, message } = calculateStrength();

  const getBarColor = () => {
    if (strength <= 20) return 'bg-[var(--password-weak)]';     // Weak
    if (strength <= 60) return 'bg-[var(--password-fair)]';     // Fair
    if (strength <= 80) return 'bg-[var(--password-good)]';     // Good
    return 'bg-primary';                                        // Strong - uses the existing primary color
  };

  return (
    <div className="mt-1 mb-4">
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>
      {password && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{message}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{strength}%</span>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthBar 