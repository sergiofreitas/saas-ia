'use client'

import NextLink, { type LinkProps } from 'next/link'
import { Refine } from '@refinedev/core'
import { SaasProvider } from '@saas-ui/react'
import routerProvider from '@refinedev/nextjs-router/app'
import { liveProvider } from '@refinedev/hasura'
import { cookieStorageManagerSSR } from '@chakra-ui/react'

import createI18nProvider from '@/providers/i18n'
import { useTranslation } from '@/domains/i18n/client'
import createDataProvider, { gqlWebSocketClient } from '@/providers/data'
import accessControlProvider from '@/providers/accessControl'
import { authProvider } from '@/providers/auth'
import { notificationProvider } from '@/providers/notificationProvider'
import { resources } from '@/constants'
import { theme } from '@/theme'

const Link: React.FC<LinkProps> = (props) => {
  return <NextLink {...props} legacyBehavior />
}

export const App = ({ children, cookies }: { children: React.ReactNode; cookies: string }) => {
  const translate = useTranslation()
  const colorModeManager = cookieStorageManagerSSR(cookies)

  return (
    <SaasProvider linkComponent={Link} theme={theme} colorModeManager={colorModeManager}>
      <Refine
        authProvider={authProvider}
        routerProvider={routerProvider}
        dataProvider={createDataProvider()}
        accessControlProvider={accessControlProvider}
        i18nProvider={createI18nProvider(translate)}
        liveProvider={liveProvider(gqlWebSocketClient)}
        notificationProvider={notificationProvider(translate.t)}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        {children}
      </Refine>
    </SaasProvider>
  )
}
