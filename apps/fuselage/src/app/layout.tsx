import React from 'react'
import { cookies } from 'next/headers'
import { dir } from 'i18next'
import { detectLanguage, getTranslation } from '@/domains/i18n'
import { App } from '@/App'

export async function generateMetadata() {
  const { t } = await getTranslation()

  return {
    title: t('title'),
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = cookies()
  const lng = detectLanguage()
  const colorMode = cookiesStore.get('chakra-ui-color-mode')?.value || ''

  return (
    <html lang={lng} dir={dir(lng)} data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode}`}>
        <App cookies={cookiesStore.toString()}>{children}</App>
      </body>
    </html>
  )
}
