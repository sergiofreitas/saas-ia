'use client'

import { Authenticated } from '@refinedev/core'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <Authenticated redirectOnFail="/login">{children}</Authenticated>
}
