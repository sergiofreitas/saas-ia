import { useTranslate } from '@refinedev/core'
import { PersonaAvatar, IconButton, MenuButton, Menu, MenuList, MenuItem, MenuDivider } from '@saas-ui/react'

export const UserMenu: React.FC = () => {
  const t = useTranslate()

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<PersonaAvatar size="xs" name="Sérgio Freitas" />} variant="ghost" />
      <MenuList>
        <MenuItem>{t('usermenu.preferences')}</MenuItem>
        <MenuDivider />
        <MenuItem>{t('usermenu.signout')}</MenuItem>
      </MenuList>
    </Menu>
  )
}
