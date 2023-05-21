const createI18nProvider = (translation: any) => {
  const { t, i18n } = translation

  const i18nProvider = {
    translate: (name: string, options: object = {}) => {
      return t(name, options)
    },
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  }
  return i18nProvider
}

export default createI18nProvider
