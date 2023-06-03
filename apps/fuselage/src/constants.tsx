import { IconCircleDashed } from '@tabler/icons-react'

export const i18nCookieName = 'i18next'

export const resources = [
  {
    name: 'me',
    list: '/profile',
  },
  {
    name: 'workspaces',
    list: '/users',
  },
]

export const menu = {
  default: [],
  settings: [
    {
      permission: null,
      link: '/profile',
      label: 'menu.settings.labels.overview',
      left: <IconCircleDashed />,
    },
    {
      permission: null,
      link: '/users',
      label: 'menu.settings.labels.users',
      left: <div style={{ width: '36px' }} />,
    },
  ],
  user: [],
}
