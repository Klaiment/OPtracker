'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'es', name: 'ES' },
  { code: 'fr', name: 'FR' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="appearance-none bg-surface text-text px-4 py-2 pr-8 
                   rounded border border-border hover:border-primary 
                   transition-colors cursor-pointer uppercase text-sm 
                   font-mono focus:outline-none focus:ring-1 
                   focus:ring-primary hover:bg-background"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} 
                  className="bg-background hover:bg-surface">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 
                      flex items-center px-2 text-text-secondary">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
} 