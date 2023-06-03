import { AppShell as BaseAppShell } from '@saas-ui/react'
import { ThemedLayoutContextProvider, RefineThemedLayoutV2Props } from '@refinedev/chakra-ui'

export const AppShell: React.FC<RefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  children,
  OffLayoutArea,
  initialSiderCollapsed,
}) => {
  return (
    <ThemedLayoutContextProvider initialSiderCollapsed={initialSiderCollapsed}>
      <BaseAppShell
        minH="100%"
        sidebar={Sider && <Sider Title={Title} />}
        navbar={Header && <Header />}
        footer={Footer && <Footer />}
      >
        {children}
      </BaseAppShell>
      {OffLayoutArea && <OffLayoutArea />}
    </ThemedLayoutContextProvider>
  )
}
