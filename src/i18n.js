import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common_en from './translations/en.json'
import common_dk from './translations/dk.json'

// the translations
const resources = {
  en: {
    translation: common_en,
  },
  dk: {
    translation: common_dk,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'dk',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
