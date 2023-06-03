import { Sidebar as BaseSidebar, SidebarSection, SidebarToggleButton, NavItem } from '@saas-ui/sidebar'
import { SearchInput } from '@saas-ui/react'
import { Spacer } from '@chakra-ui/react'
import { useTranslate } from '@refinedev/core'
import { IconHome, IconUsers, IconSettings } from '@tabler/icons-react'

type SidebarProps = {
  Title?: React.FC
  Footer?: React.FC
  items: any[]
}

export const AppSidebar: React.FC<SidebarProps> = ({ Title, Footer, items }) => {
  const t = useTranslate()

  return (
    <BaseSidebar>
      <SidebarToggleButton />
      <SidebarSection direction="row">
        {Title && <Title />}
        <Spacer />
        {/* Adicionar o user Menu */}
      </SidebarSection>
      <SidebarSection direction="row">
        {/* Construir um componente mais completo para colocar aqui */}
        <SearchInput placeholder={t('sidebar.search')} />
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto" aria-label="Main">
        <NavItem icon={<IconHome />} isActive>
          Home
        </NavItem>
        <NavItem icon={<IconUsers />}>Users</NavItem>
        <NavItem icon={<IconSettings />}>Settings</NavItem>
      </SidebarSection>
      <SidebarSection>{Footer && <Footer />}</SidebarSection>
    </BaseSidebar>
  )
}
