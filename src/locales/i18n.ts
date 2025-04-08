import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import en from '../locales/en.json';
import ru from '../locales/ru.json';
import { LanguageStorage } from '../stores/local/LocalStorage';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON : 'v3',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'az',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['asyncStorage', 'fallback'],
      async: true,
      caches: [],
      lookupAsyncStorage: async () => {
        const lang = await LanguageStorage.language('get');
        return lang || 'en';
      },
    },
  });

i18n.on('languageChanged', async (lng) => {
  await LanguageStorage.language('set', lng);
});

export default i18n;