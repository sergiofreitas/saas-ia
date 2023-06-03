'use client'

import { Authenticated } from '@refinedev/core'
import { AppShell, SettingsSidebar } from 'ui'
import { Title } from '@/domains/layout/ui/title'
import { useMenuContext } from '@/domains/layout/contexts/menuContext'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { settings } = useMenuContext()
  return (
    <Authenticated redirectOnFail="/login">
      <AppShell Sider={(props) => <SettingsSidebar {...props} items={settings} />} Title={Title}>
        {children}
      </AppShell>
    </Authenticated>
  )
}
