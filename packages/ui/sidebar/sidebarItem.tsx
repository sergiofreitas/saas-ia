'use client'

import { useParsed } from '@refinedev/core'
import { Text, Badge } from '@chakra-ui/react'
import { NavItem } from '@saas-ui/sidebar'

type SidebarItemProps = {
  permission: { action: string; resource: string } | null
  label: string
  link?: string
  left?: React.ReactElement
  right?: React.ReactElement
  action?: () => void
  children?: SidebarItemProps[]
}

export const SidebarItem = ({ left, right, label, link, children }: SidebarItemProps) => {
  const parsed = useParsed()

  const isActive = parsed.pathname?.includes(link!)

  if (children) {
    return null
  }

  return (
    <NavItem icon={left} href={link} isActive={isActive}>
      <Text>{label}</Text>
      {right && (
        <Badge opacity="0.6" borderRadius="full" bg="none" ms="auto">
          {right}
        </Badge>
      )}
    </NavItem>
  )
}
