'use client'

import NextLink, { type LinkProps } from 'next/link'
import { Refine } from '@refinedev/core'
import { SaasProvider } from '@saas-ui/react'
import routerProvider from '@refinedev/nextjs-router/app'
import { cookieStorageManagerSSR } from '@chakra-ui/react'

import createI18nProvider from '@/providers/i18n'
import { useTranslation } from '@/domains/i18n/client'
import createDataProvider, { liveProvider, gqlWebSocketClient } from '@/providers/data'
import accessControlProvider from '@/providers/accessControl'
import { authProvider } from '@/providers/auth'
import { notificationProvider } from '@/providers/notificationProvider'
import { resources, menu } from '@/constants'
import { theme } from '@/theme'
import { MenuContext } from '@/domains/layout/contexts/menuContext'

const Link: React.FC<LinkProps> = (props) => {
  return <NextLink {...props} legacyBehavior />
}

export const App = ({ children, cookies }: { children: React.ReactNode; cookies: string }) => {
  const translate = useTranslation()
  const colorModeManager = cookieStorageManagerSSR(cookies)

  return (
    <SaasProvider linkComponent={Link} theme={theme} colorModeManager={colorModeManager}>
      <MenuContext.Provider value={menu}>
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
      </MenuContext.Provider>
    </SaasProvider>
  )
}
