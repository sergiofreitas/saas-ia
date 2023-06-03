import { Sidebar as BaseSidebar, SidebarSection, SidebarToggleButton, NavItem } from '@saas-ui/sidebar'
import { Heading, Button } from '@chakra-ui/react'
import { useTranslate } from '@refinedev/core'
import { IconHome, IconUsers, IconSettings, IconArrowLeft } from '@tabler/icons-react'
import { SidebarItem } from './sidebarItem'

type SidebarProps = {
  Footer?: React.FC
  items: any[]
}

export const SettingsSidebar: React.FC<SidebarProps> = ({ Footer, items }) => {
  const t = useTranslate()

  return (
    <BaseSidebar>
      <SidebarToggleButton />
      <SidebarSection direction="row" alignItems="center">
        <Button variant="ghost" size="sm">
          <IconArrowLeft size="18" />
        </Button>
        <Heading size="md" lineHeight="1">
          {t('menu.settings.title')}
        </Heading>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto" aria-label="Main">
        {items.map((item, idx) => (
          <SidebarItem key={`sidebaritem-${idx}`} {...item} label={t(item.label)} />
        ))}
      </SidebarSection>
      <SidebarSection>{Footer && <Footer />}</SidebarSection>
    </BaseSidebar>
  )
}
