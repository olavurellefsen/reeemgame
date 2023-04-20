import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common_en from './translations/en.json'
import common_de from './translations/de.json'
import common_dk from './translations/dk.json'
import common_fo from './translations/fo.json'

// the translations
const resources = {
  en: {
    translation: common_en,
  },
  de: {
    translation: common_de,
  },
  dk: {
    translation: common_dk,
  },
  fo: {
    translation: common_fo,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
