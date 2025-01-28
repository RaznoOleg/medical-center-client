import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translation.json';
import translationUa from './ua/translation.json';
import { ukrainian } from '../constants/languages';

const resources = {
  en: {
    translation: translationEn
  },
  ua: {
    translation: translationUa
  }
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ukrainian,
    debug: false,
    resources,
    lng: localStorage.getItem('i18nextLng') || ukrainian,
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
