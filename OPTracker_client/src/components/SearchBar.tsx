'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', searchTerm, 'in category:', category);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <form onSubmit={handleSearch} className="flex gap-2 bg-surface p-4 rounded border border-border">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-background text-text border border-border rounded font-mono"
        >
          <option value="all">{t('home.search.categories.all')}</option>
          <option value="audio">{t('home.search.categories.audio')}</option>
          <option value="video">{t('home.search.categories.video')}</option>
          <option value="applications">{t('home.search.categories.applications')}</option>
          <option value="games">{t('home.search.categories.games')}</option>
          <option value="other">{t('home.search.categories.other')}</option>
        </select>
        <input
          type="text"
          placeholder={t('home.search.placeholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 bg-background text-text border border-border rounded font-mono"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-primary text-background font-semibold rounded hover:bg-primary-dark transition-colors"
        >
          {t('home.search.button')}
        </button>
      </form>
    </div>
  );
} 