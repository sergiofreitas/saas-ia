'use client'

import { Spacer } from '@chakra-ui/react'
import { useTranslate } from '@refinedev/core'
import { Button } from '@saas-ui/react'
import { useDataTable, DataTable, Page, ColumnDropdown } from 'ui'

type TabbarProps = {
  label: string
  title: string
  table: any
}

const Tabbar: React.FC<TabbarProps> = ({ table, title, label }) => (
  <>
    <Spacer />
    <ColumnDropdown title={title} table={table}>
      <Button variant="outline" size="sm">
        {label}
      </Button>
    </ColumnDropdown>
  </>
)

const columns = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'avatarUrl',
  },
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'displayName',
  },
]

const ProfilePage = () => {
  const t = useTranslate()
  const table = useDataTable({
    columns,
    refineCoreProps: {
      resource: 'users',
      metaData: {
        fields: ['avatarUrl', 'displayName', 'defaultRole', 'email'],
      },
    },
  })

  return (
    <Page
      title="Profile"
      maxW="full"
      tabbar={<Tabbar label={t('table.view')} title={t('table.columns.title')} table={table} />}
    >
      <DataTable table={table} />
    </Page>
  )
}

export default ProfilePage
