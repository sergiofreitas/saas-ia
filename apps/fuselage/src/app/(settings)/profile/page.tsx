'use client'

import { Spacer } from '@chakra-ui/react'
import { useTranslate } from '@refinedev/core'
import { Button } from '@saas-ui/react'
import { IconPlus } from '@tabler/icons-react'
import {
  type UseDataTableReturn,
  useDataTable,
  DataTable,
  Page,
  ColumnDropdown,
  ToggleButtonGroup,
  ToggleButton,
  FilterDropdown,
} from 'ui'

type TabbarProps = {
  label: string
  title: string
  table: UseDataTableReturn
}

const Tabbar: React.FC<TabbarProps> = ({ table, title, label }) => (
  <>
    <ToggleButtonGroup
      isAttached
      size="xs"
      mr={5}
      variant="outline"
      type="radio"
      defaultValue="all"
      onChange={(value) => {
        const header = table.getLeafHeaders().find((header) => header.id === 'displayName')

        if (value === 'all') {
          header.column.setFilterValue(null)
        } else {
          header.column.setFilterValue(value)
        }
      }}
    >
      <ToggleButton value="all">Tudo</ToggleButton>
      <ToggleButton value="sergio">Novos</ToggleButton>
      <ToggleButton value="old">Antigos</ToggleButton>
    </ToggleButtonGroup>
    <FilterDropdown table={table}>
      <Button variant="outline" size="xs" leftIcon={<IconPlus size={12} />} borderStyle="dashed">
        Filtro
      </Button>
    </FilterDropdown>
    <Spacer />
    <ColumnDropdown title={title} table={table}>
      <Button variant="outline" size="xs">
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
    id: 'displayName',
    header: 'Name',
    accessorKey: 'displayName',
    meta: {
      filterOperator: 'contains',
      ui: {
        type: 'text',
      },
    },
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
