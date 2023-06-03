'use client'

import { Spacer } from '@chakra-ui/react'
import { useTranslate } from '@refinedev/core'
import { Button } from '@saas-ui/react'
import { useDataTable, DataTable, Page, ColumnDropdown } from 'ui'

const Tabbar = ({ label }: { label: string }) => (
  <>
    <Spacer />
    <ColumnDropdown title="Display Columns">
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
    accessorKey: 'id',
  },
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
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
    <Page title="Profile" maxW="full" tabbar={<Tabbar label={t('table.view')} />}>
      <p>Conteudo</p>
    </Page>
  )
}

export default ProfilePage
