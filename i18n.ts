import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fa', // زبان پیش‌فرض
    debug: false,
    interpolation: {
      escapeValue: false, // در صورت نیاز به خاصیت XSS می‌توانید این را true کنید
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // مسیر فایل‌های ترجمه
    },
  });

export default i18n;
