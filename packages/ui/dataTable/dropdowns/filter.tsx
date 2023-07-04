import { useState } from 'react'
import { BaseRecord, HttpError } from '@refinedev/core'
import { Menu, MenuItem, Text, useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { UseTableReturnType } from '@refinedev/react-table'
import { IconCircle } from '@tabler/icons-react'
import { ActiveFilterItem, useFilters } from '../hooks/useFilters'
import { FilterableMenuList } from '../../filterableMenu'
import { getDefaultOperator } from '../filter/operator'
import { FilterText, FilterBoolean, FilterDate, FilterEnum, FilterNumber } from '../filter/value'

type FilterDropdownProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = {
  table: UseTableReturnType<TData, TError>
  children: React.ReactNode
}

const renderContent = (selected: ActiveFilterItem, disclosure: UseDisclosureReturn, onChange: (value: any) => void) => {
  const FilterContentTypes = {
    enum: FilterEnum,
    number: FilterNumber,
    boolean: FilterBoolean,
    date: FilterDate,
    text: FilterText,
  }

  const Component = FilterContentTypes[selected.ui.type].Content

  return <Component disclosure={disclosure} filter={selected} onChange={onChange} />
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ table, children }) => {
  const disclosure = useDisclosure()
  const [selected, setSelected] = useState<ActiveFilterItem | null>(null)
  const { appendFilter, filters } = useFilters(table)

  return (
    <Menu onOpen={() => setSelected(null)}>
      {children}
      {selected ? (
        renderContent(selected, disclosure, (value) => appendFilter(selected, value, getDefaultOperator(selected)))
      ) : (
        <FilterableMenuList>
          {filters.map((filter) => {
            const Icon = filter.ui.icon || IconCircle

            return (
              <MenuItem
                key={`filter-item-${filter.column.id}`}
                icon={<Icon size={14} />}
                closeOnSelect={false}
                onClick={() => {
                  setSelected({ ...filter, value: '', operator: '' })
                  disclosure.onOpen()
                }}
              >
                <Text fontSize="sm">{filter.column.columnDef.header as string}</Text>
              </MenuItem>
            )
          })}
        </FilterableMenuList>
      )}
    </Menu>
  )
}
