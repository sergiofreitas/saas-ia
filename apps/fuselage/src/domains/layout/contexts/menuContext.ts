import { createContext, useContext } from 'react'

export type MenuItem = {
  permission: { action: string; resource: string } | null
  label: string
  link?: string
  left?: React.ReactElement
  right?: React.ReactElement
  action?: () => void
  children?: MenuItem[]
}

export type MenuConfig = {
  default: MenuItem[]
  settings: MenuItem[]
  user: MenuItem[]
}

export const MenuContext = createContext<MenuConfig>({ default: [], settings: [], user: [] })

export const useMenuContext = () => useContext(MenuContext)
