'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Importamos los archivos de traducción
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

// Obtener el idioma guardado
const getSavedLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('i18nextLng') || 'en';
  }
  return 'en';
};

// Evitamos inicializar i18next múltiples veces
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        es: { translation: es },
        fr: { translation: fr }
      },
      lng: getSavedLanguage(),
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      
      interpolation: {
        escapeValue: false,
      },
      
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage'],
      },

      react: {
        useSuspense: false
      }
    });

  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lng);
    }
  });
}

export default i18n; 