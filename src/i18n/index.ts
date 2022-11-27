import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector'

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    compatibilityJSON: 'v3',
    resources: {
      'en-US': {
        translation: require('../i18n/translations/en-US.json'),
      },
      ja: {
        translation: require('../i18n/translations/ja-JP.json'),
      },
    },
    lng: 'en-US',
    fallbackLng: 'en-US',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
