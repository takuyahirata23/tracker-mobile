import en from './src/i18n/translations/en-US.json'

const getValue = key =>
  key.split('.').reduce((acc, x, i) => (i ? acc[x] || {} : en[x] || {}), null)

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: getValue,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))
