import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { cookies, headers } from 'next/headers'
import acceptLanguage from 'accept-language'

import { i18nCookieName } from '@/constants'
import { getOptions, languages, fallbackLng } from './settings'

acceptLanguage.languages(languages)

const initI18next = async (lng: string, ns?: string | string[]) => {
  const instance = createInstance()
  await instance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))

  return instance
}

export function detectLanguage() {
  const cookiesStore = cookies()
  const headersStore = headers()

  const possibilities = []

  if (cookiesStore.has(i18nCookieName)) {
    possibilities.push(acceptLanguage.get(cookiesStore.get(i18nCookieName)?.value))
  }

  possibilities.push(acceptLanguage.get(headersStore.get('Accept-Language')))

  return possibilities.find((it) => it) || fallbackLng
}

export async function useTranslation(ns?: string | string[], options: Record<string, string> = {}) {
  return await getTranslation(ns, options)
}

export async function getTranslation(ns?: string | string[], options: Record<string, string> = {}) {
  const lng = detectLanguage()
  const instance = await initI18next(lng, ns)
  const firstNs = Array.isArray(ns) ? ns[0] : ns

  return {
    t: instance.getFixedT(lng, firstNs, options.keyPrefix),
    i18n: instance,
  }
}
